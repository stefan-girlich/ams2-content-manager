import path from 'path'
import ModContents from '../../common/@types/ModContents'

const createUnknownFileContents = (filePath: string): ModContents => {
    return {
        path: filePath,
        name: path.basename(filePath),
        type: 'unknown',
        version: null,
        readmeFilePath: null,
        manifest: null,
        carData: null,
        bootfilesData: null,
    }
}

export default createUnknownFileContents
