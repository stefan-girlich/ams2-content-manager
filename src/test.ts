import * as fs from 'fs'
import * as path from 'path'
import installModFromArchive from './backend/data/installModFromArchive'
import joinPaths from './backend/util/joinPaths'

// TODO move to dedicated test file structure, use test runner like Jest

const SUPPORTED_ARCHIVE_FILE_TYPES = ['7z']
const USER_DATA_DIR = 'userdata'
const BOOT_FILES_FILE_PREFIX_REGEX = '__bootfiles_.+\\.7z'

const listFiles = async (directory: string, extensions: string[]): Promise<string[]> => {
    const files = await fs.promises.readdir(directory)
    const filteredFiles = files.filter(file => {
        const ext = file.split('.').pop()
        return extensions.includes(ext)
    })
    return filteredFiles
}

const listModArchives = async () => {
    const fileNames = await listFiles(USER_DATA_DIR, SUPPORTED_ARCHIVE_FILE_TYPES)
    const potentialModFileNames = fileNames.filter(fileName => !fileName.match(BOOT_FILES_FILE_PREFIX_REGEX))
    const potentialModFilePaths = potentialModFileNames.map(name => path.join(USER_DATA_DIR, name))

    return potentialModFilePaths
}

const main = async () => {
    console.log('main()')

    // const filePaths = await listModArchives()

    const testeePath = joinPaths('userdata', 'archives', 'Lamborghini SCV12 v1.4.5.2.7z')
    await installModFromArchive(testeePath)
}

main()
