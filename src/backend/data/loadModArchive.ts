import _7z from '7zip-min'
import * as fs from 'fs'
import * as path from 'path'
import ModContents from './entity/ModContents'

const TMP_DIR = 'userdata/tmp/' // TODO get OS cache dir

const README_FILE_REGEX = /.*readme.*/i
const CRD_LINE_REGEX = /^.*\.crd$/gim
const DRIVELINE_LINES_REGEX = /^RECORD.*$(\r\n|.)*?\r\n/gim

const _extractModArchive = (filePath: string) => {
    const fileName = path.parse(filePath).name
    const targetDir = path.join(TMP_DIR, fileName)
    return new Promise<string>((resolve, reject) => {
        _7z.unpack(filePath, targetDir, err => {
            if (err) return reject(err)
            resolve(targetDir)
        })
    })
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

const _loadModContents = async (extractArchiveDirPath: string) => {
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

    const result: ModContents = {
        path: extractArchiveDirPath,
        readmeFilePath,
        crdFilePaths,
        contentDirPath,
        drivelineEntries,
    }

    return result
}

// TODO rename, add "meta"
const loadModArchive = async (filePath: string) => {
    const targetDir = await _extractModArchive(filePath)
    console.log('🚀 ~ file: loadModArchive.ts:31 ~ loadModArchive ~ targetDir:', targetDir)
    const foo = await _loadModContents(targetDir)
}

export default loadModArchive
