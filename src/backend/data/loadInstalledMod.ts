import * as fs from 'fs'
import * as path from 'path'
import ModContents from '../../common/@types/ModContents'
import loadManifest from './loadManifest'

const README_FILE_REGEX = /.*readme.*\.(md|txt)/i
const CRD_LINE_REGEX = /^.*\.crd$/gim
// const DRIVELINE_LINES_REGEX = /^RECORD.*$(\r\n|.)*?\r\n^\s*$^$/gim
const DRIVELINE_LINES_REGEX = /^RECORD.*$(\r\n|.)*?\r\n^\s*$/gim

const _findReadmeFile = async (extractArchiveDirPath: string) => {
    const files = await fs.promises.readdir(extractArchiveDirPath)
    let readmeFilePath: string = null

    await Promise.all(
        files.map(async fileName => {
            const fullPath = path.join(extractArchiveDirPath, fileName)
            const stat = await fs.promises.lstat(fullPath)
            if (stat.isFile() && fileName.match(README_FILE_REGEX)) {
                if (readmeFilePath) throw new Error('found more than one README file')
                readmeFilePath = fullPath
            }
        })
    )

    return readmeFilePath
}

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
    extractArchiveDirPath: string,
    readmeFilePath: string
): Promise<ModContents> => {
    const { crdFilePaths, drivelineEntries } = await _parseReadme(readmeFilePath)
    const result: ModContents = {
        name: path.basename(extractArchiveDirPath),
        path: extractArchiveDirPath,
        readmeFilePath,
        vehicleListEntries: crdFilePaths,
        drivelineEntries,
        manifest: null,
    }

    return result
}

const _parseDrivelineFileContent = (fileContent: string) => {
    // TODO if last line is non-empty: throw
    const drivelineEntries = fileContent.match(DRIVELINE_LINES_REGEX)
    if (!drivelineEntries?.length) throw new Error('no driveline entries found in file content:\n' + fileContent)
    return drivelineEntries
}

const loadInstalledMod = async (extractArchiveDirPath: string): Promise<ModContents> => {
    const readmeFilePath = await _findReadmeFile(extractArchiveDirPath)
    const manifest = await loadManifest(extractArchiveDirPath)
    if (!manifest) {
        console.warn('fallback: parsing mod data from file contents')
        return _parseModFilesWithoutManifest(extractArchiveDirPath, readmeFilePath)
    }

    // const fullPath = path.join(extractArchiveDirPath, fileName)

    const vehicleListEntries = manifest.cars.map(car => car.vehicle_list_file)

    const drivelineEntriesByCar = await Promise.all(
        manifest.cars.map(async car => {
            const drivelineFileContent = await fs.promises.readFile(car.driveline_entries_file, { encoding: 'utf-8' })
            const drivelineEntriesForCar = _parseDrivelineFileContent(drivelineFileContent)
            return drivelineEntriesForCar
        })
    )

    const drivelineEntries = drivelineEntriesByCar.flat()

    const result: ModContents = {
        name: manifest.name,
        path: extractArchiveDirPath,
        readmeFilePath,
        vehicleListEntries,
        drivelineEntries,
        manifest,
    }

    return result
}

export default loadInstalledMod
