import * as fs from 'fs'
import * as path from 'path'

const SUPPORTED_FILE_TYPES = ['7z']
const USER_DATA_DIR = 'userdata/'
const BOOT_FILES_FILE_PREFIX_REGEX = '__bootfiles_.+\\.7z'

// TODO add docs: test-only code, not needed in prod
const listFiles = async (directory: string, extensions: string[]): Promise<string[]> => {
    const files = await fs.promises.readdir(directory)
    const filteredFiles = files.filter(file => {
        const ext = file.split('.').pop()
        return extensions.includes(ext)
    })
    return filteredFiles
}

// TODO add docs: test-only code, not needed in prod
const listModArchives = async () => {
    const fileNames = await listFiles(USER_DATA_DIR, SUPPORTED_FILE_TYPES)
    const potentialModFileNames = fileNames.filter(fileName => !fileName.match(BOOT_FILES_FILE_PREFIX_REGEX))
    const potentialModFilePaths = potentialModFileNames.map(name => path.join(USER_DATA_DIR, name))

    return potentialModFilePaths
}

export default listModArchives
