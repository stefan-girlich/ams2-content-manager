import path from 'path'
import ModContents from '../../common/@types/ModContents'

const createUnknownFileContents = (filePath: string): ModContents => {
    return {
        path: filePath,
        name: path.basename(filePath),
        type: 'unknown',
        readmeFilePath: null,
        manifest: null,
        carData: null,
        bootfilesData: null,
    }
}

export default createUnknownFileContents
