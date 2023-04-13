import * as fs from 'fs'
import * as path from 'path'
import ModContents from '../../common/@types/ModContents'
import createUnknownFileContents from './createUnknownFileContents'
import findReadmeFile from './findReadmeFile'
import buildModConfigDirPath from './buildModConfigDirPath'
import loadManifest from './loadManifest'
import { fileExists } from './fileOps'

const CRD_LINE_REGEX = /^.*\.crd$/gim
const DRIVELINE_LINES_REGEX = /^RECORD.*$(\r\n|.)*?\r\n^\s*$/gim
export const DRIVELINE_ENTRY_REGEX = new RegExp(DRIVELINE_LINES_REGEX.source, 'm') // TODO move them all to a single location
const CAR_ID_IN_DRIVE_ENTRY_REGEX = /^\s*name\s+"(.+)"\s*$/im

const _parseReadme = async (filePath: string) => {
    const readmeContent = await fs.promises.readFile(filePath, { encoding: 'utf-8' })

    const crdFilePaths = readmeContent.match(CRD_LINE_REGEX)
    if (!crdFilePaths) throw new Error(`no .crd file paths found in file: ${filePath}`)

    const drivelineEntriesWithTrailingSpace = readmeContent.match(DRIVELINE_LINES_REGEX)
    if (!drivelineEntriesWithTrailingSpace) throw new Error(`no driveline entries found in file: ${filePath}`)

    const drivelineEntries = drivelineEntriesWithTrailingSpace.map(entry => entry.trim())

    let carId: string | null = null
    for (const entry of drivelineEntries) {
        const carIdMatch = entry.match(CAR_ID_IN_DRIVE_ENTRY_REGEX)
        if (!carIdMatch) continue

        const newCarId = carIdMatch[1]
        if (carId && carId !== newCarId)
            throw new Error(`found more than one car ID: ${carId}, ${newCarId}. not supported yet.`)
        carId = newCarId
    }

    return {
        id: carId,
        crdFilePaths,
        drivelineEntries,
    }
}

const _parseModFilesWithoutManifest = async (
    modDirPathInModsDir: string,
    readmeFilePath: string
): Promise<ModContents> => {
    const modName = path.basename(modDirPathInModsDir)
    const { id, crdFilePaths, drivelineEntries } = await _parseReadme(readmeFilePath)
    const result: ModContents = {
        name: modName,
        path: modDirPathInModsDir,
        type: 'car_mod',
        version: null, // TODO determine version; code available in FE
        readmeFilePath,
        manifest: null,
        carData: {
            id,
            vehicleListEntries: crdFilePaths,
            drivelineEntries,
        },
        bootfilesData: null,
    }

    return result
}

// TODO allow modName as argument, content path can be derived: MODS/<modName>
const loadInstalledMod = async (modDirPathInModsDir: string): Promise<ModContents> => {
    const modName = path.basename(modDirPathInModsDir)
    const modConfigDir = await buildModConfigDirPath(modName)

    // TODO manifest disabled temporarily
    const manifest = false && (await loadManifest(modDirPathInModsDir))

    const modConfigDirExists = await fileExists(modConfigDir, true)
    if (!modConfigDirExists) return createUnknownFileContents(modDirPathInModsDir)

    if (!manifest) {
        console.warn('fallback: parsing mod data from file contents')
        const readmeFilePath = await findReadmeFile(modConfigDir)
        return _parseModFilesWithoutManifest(modDirPathInModsDir, readmeFilePath)
    }

    throw new Error('TODO manifest disabled for now')

    // const fullPath = path.join(extractArchiveDirPath, fileName)

    // const vehicleListEntries = manifest.cars.map(car => car.vehicle_list_file)

    // const drivelineEntriesByCar = await Promise.all(
    //     manifest.cars.map(async car => {
    //         const drivelineFileContent = await fs.promises.readFile(car.driveline_entries_file, { encoding: 'utf-8' })
    //         const drivelineEntriesForCar = _parseDrivelineFileContent(drivelineFileContent)
    //         return drivelineEntriesForCar
    //     })
    // )

    // const drivelineEntries = drivelineEntriesByCar.flat()

    // const result: ModContents = {
    //     name: manifest.name,
    //     path: modDirPathInModsDir,
    //     type: 'car_mod',
    //     readmeFilePath,
    //     manifest,
    //     carData: {
    //         vehicleListEntries,
    //         drivelineEntries,
    //     },
    //     bootfilesData: null,
    // }

    // return result
}

export default loadInstalledMod
