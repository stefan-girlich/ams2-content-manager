import fs from 'fs'
import path from 'path'

const README_FILE_REGEX = /.*readme.*\.(md|txt)/i

const findReadmeFile = async (modDirPath: string) => {
    const files = await fs.promises.readdir(modDirPath)
    let readmeFilePath: string = null

    await Promise.all(
        files.map(async fileName => {
            const fullPath = path.join(modDirPath, fileName)
            const stat = await fs.promises.lstat(fullPath)
            if (stat.isFile() && fileName.match(README_FILE_REGEX)) {
                if (readmeFilePath) throw new Error('found more than one README file')
                readmeFilePath = fullPath
            }
        })
    )

    return readmeFilePath
}

export default findReadmeFile
