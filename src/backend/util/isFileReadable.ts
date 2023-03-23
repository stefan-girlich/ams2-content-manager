import fs from 'fs'

const isFileReadable = async (filePath: string) => {
    try {
        await fs.promises.access(filePath, fs.constants.R_OK)
        return true
    } catch (error) {
        return false
    }
}

export default isFileReadable
