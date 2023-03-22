import * as fs from 'fs'
import * as path from 'path'
import ModContents from '../../common/@types/ModContents'

const README_FILE_REGEX = /.*readme.*/i
const CRD_LINE_REGEX = /^.*\.crd$/gim
const DRIVELINE_LINES_REGEX = /^RECORD.*$(\r\n|.)*?\r\n^\s*$^$/gim

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

const loadInstalledMod = async (extractArchiveDirPath: string) => {
    const files = await fs.promises.readdir(extractArchiveDirPath)

    // TODO file paths should be absolute
    let readmeFilePath: string = null
    let contentDirPath: string = null

    await Promise.all(
        files.map(async fileName => {
            const fullPath = path.join(extractArchiveDirPath, fileName)
            const stat = await fs.promises.lstat(fullPath)
            if (stat.isFile() && fileName.match(README_FILE_REGEX)) {
                if (readmeFilePath) throw new Error('found more than one README file')
                readmeFilePath = fullPath
            } else if (stat.isDirectory()) {
                if (contentDirPath) throw new Error('more than one root-level directory found')
                contentDirPath = fullPath
            }
        })
    )

    if (!readmeFilePath) throw new Error('did not find README file')
    if (!contentDirPath) throw new Error('did not find content directory')

    const { crdFilePaths: rawCrdFilePaths, drivelineEntries } = await _parseReadme(readmeFilePath)

    const crdFilePaths = rawCrdFilePaths.map(filePath => path.join(extractArchiveDirPath, filePath))

    const dirName = path.basename(extractArchiveDirPath)

    const result: ModContents = {
        path: extractArchiveDirPath,
        dirName,
        readmeFilePath,
        crdFilePaths,
        contentDirPath,
        drivelineEntries,
    }

    return result
}

export default loadInstalledMod
