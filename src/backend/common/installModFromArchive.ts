import fs from 'fs'
import path from 'path'
import { BootfilesData, CarsData } from '../../common/@types/ModContents'
import addDrivelineEntry from '../driveline/addDrivelineEntry'
import isDrivelineEntryPresent from '../driveline/isDrivelineEntryPresent'
import joinPaths from '../util/joinPaths'
import addVehicleListEntry from '../vehiclelist/addVehicleListEntry'
import isVehicleListEntryPresent from '../vehiclelist/isVehicleListEntryPresent'
import extractModArchive from './extractModArchive'
import findBootfiles from './findBootfiles'
import findReadmeFile from './findReadmeFile'
import buildModConfigDirPath from './buildModConfigDirPath'
import { listMods } from './listModsAndSyncStatus'
import loadInstalledMod from './loadInstalledMod'
import loadUserSettings from '../settings/loadUserSettings'
import getModsDir from './getModsDir'

const _findSingleDirectoryPath = async (rootDirectory: string) => {
    const files = await fs.promises.readdir(rootDirectory)

    const dirsOrNulls = await Promise.all(
        files.map(async file => {
            const stat = await fs.promises.lstat(joinPaths(rootDirectory, file))
            const isDir = stat.isDirectory()
            if (!isDir) return null
            return file
        })
    )

    const dirs = dirsOrNulls.filter(dir => dir !== null)
    if (dirs.length === 0) throw new Error(`no directories in path: ${rootDirectory}`)
    if (dirs.length > 1) throw new Error(`more than one directory in path: ${rootDirectory}`)
    return joinPaths(rootDirectory, dirs[0])
}

interface ModDestinationPaths {
    gameContents: string
    resources: string
}

const _copyModContent = async (modsDir: string, extractionDir: string): Promise<ModDestinationPaths> => {
    // TODO add support for manifest provided in archive
    // const manifestSrcPath = await findManifestFilePath(extractionDir)
    // if (manifestSrcPath) {
    //     const manifestDestPath = _buildDestinationPath(manifestSrcPath)
    //     fs.promises.copyFile(manifestSrcPath, manifestDestPath)
    //     return
    // }

    // TODO use other dir name for resources dir?
    const gameDirSrcPath = await _findSingleDirectoryPath(extractionDir)
    const modContentsDirName = path.basename(gameDirSrcPath)
    const readmeSrcPath = await findReadmeFile(extractionDir)
    const readmeFileName = path.basename(readmeSrcPath)

    const modResourcesDir = await buildModConfigDirPath(modContentsDirName)
    await fs.promises.mkdir(modResourcesDir, { recursive: true })

    const readmeDestPath = joinPaths(modResourcesDir, readmeFileName)
    await fs.promises.copyFile(readmeSrcPath, readmeDestPath)

    const gameDirDestPath = joinPaths(modsDir, modContentsDirName)

    // TODO file bug report? fs.promises.cp fails with code "EISDIR" despite "recursive: true"
    return new Promise((resolve, reject) => {
        fs.cp(gameDirSrcPath, gameDirDestPath, { recursive: true }, err => {
            if (err) {
                reject(err)
                return
            }
            resolve({
                gameContents: gameDirDestPath,
                resources: modResourcesDir,
            })
        })
    })
}

const _insertVehicleListEntries = async (bootfilesData: BootfilesData, carsData: CarsData): Promise<void> => {
    const { vehicleListFilePath } = bootfilesData
    const { vehicleListEntries } = carsData

    const missingEntriesOrNull = await Promise.all(
        vehicleListEntries.map(async entry => {
            const hasEntry = await isVehicleListEntryPresent(vehicleListFilePath, entry)
            return hasEntry ? null : entry
        })
    )
    const missingEntries = missingEntriesOrNull.filter(x => x !== null)
    for (const entry of missingEntries) {
        await addVehicleListEntry(vehicleListFilePath, entry)
    }
}

const _insertDrivelineEntries = async (bootfilesData: BootfilesData, carsData: CarsData): Promise<void> => {
    const { drivelineFilePath } = bootfilesData
    const { drivelineEntries } = carsData

    const missingEntriesOrNull = await Promise.all(
        drivelineEntries.map(async entry => {
            const hasEntry = await isDrivelineEntryPresent(drivelineFilePath, entry)
            return hasEntry ? null : entry
        })
    )

    const missingEntries = missingEntriesOrNull.filter(x => x !== null)
    for (const entry of missingEntries) {
        await addDrivelineEntry(drivelineFilePath, entry, carsData.id)
    }
}

const installModFromArchive = async (filePath: string): Promise<void> => {
    // TODO prevent wrongful handling of non-car mods
    const { gameDir } = await loadUserSettings()
    if (!gameDir) throw new Error('Game directory not selected yet')
    const modsDir = getModsDir(gameDir)

    const extractionTargetDir = await extractModArchive(filePath)

    const { gameContents: gameContentsDir } = await _copyModContent(modsDir, extractionTargetDir)
    const { carData } = await loadInstalledMod(gameContentsDir)

    const allMods = await listMods(modsDir)
    const { bootfilesData } = findBootfiles(allMods)

    await _insertVehicleListEntries(bootfilesData, carData)
    await _insertDrivelineEntries(bootfilesData, carData)
}

export default installModFromArchive
