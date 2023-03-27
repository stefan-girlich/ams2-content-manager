import * as fs from 'fs'
import * as path from 'path'
import ModContents from '../../common/@types/ModContents'
import createUnknownFileContents from './createUnknownFileContents'
import findReadmeFile from './findReadmeFile'
import getModConfigDirPath from './getModConfigDir'
import loadManifest from './loadManifest'

const CRD_LINE_REGEX = /^.*\.crd$/gim
const DRIVELINE_LINES_REGEX = /^RECORD.*$(\r\n|.)*?\r\n^\s*$/gim

const _parseReadme = async (filePath: string) => {
    const readmeContent = await fs.promises.readFile(filePath, { encoding: 'utf-8' })

    const crdFilePaths = readmeContent.match(CRD_LINE_REGEX)
    if (!crdFilePaths) throw new Error(`no .crd file paths found in file: ${filePath}`)

    const drivelineEntries = readmeContent.match(DRIVELINE_LINES_REGEX)
    if (!drivelineEntries) throw new Error(`no driveline entries found in file: ${filePath}`)

    return {
        crdFilePaths,
        drivelineEntries,
    }
}

const _parseModFilesWithoutManifest = async (
    modDirPathInModsDir: string,
    readmeFilePath: string
): Promise<ModContents> => {
    const modName = path.basename(modDirPathInModsDir)
    const { crdFilePaths, drivelineEntries } = await _parseReadme(readmeFilePath)
    const result: ModContents = {
        name: modName,
        path: modDirPathInModsDir,
        type: 'car_mod',
        readmeFilePath,
        manifest: null,
        carData: {
            vehicleListEntries: crdFilePaths,
            drivelineEntries,
        },
        bootfilesData: null,
    }

    return result
}

const _parseDrivelineFileContent = (fileContent: string) => {
    // TODO if last line is non-empty: throw
    const drivelineEntries = fileContent.match(DRIVELINE_LINES_REGEX)
    if (!drivelineEntries?.length) throw new Error('no driveline entries found in file content:\n' + fileContent)
    return drivelineEntries
}

const loadInstalledMod = async (modDirPathInModsDir: string): Promise<ModContents> => {
    const modName = path.basename(modDirPathInModsDir)
    const modConfigDir = await getModConfigDirPath(modName)
    const readmeFilePath = await findReadmeFile(modConfigDir)

    // TODO manifest disabled temporarily
    const manifest = false && (await loadManifest(modDirPathInModsDir))

    if (!modConfigDir) return createUnknownFileContents(modConfigDir)

    if (!manifest) {
        console.warn('fallback: parsing mod data from file contents')
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
