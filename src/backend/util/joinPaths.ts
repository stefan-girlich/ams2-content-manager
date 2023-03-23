import path from 'path'
import os from 'os'

const joinPaths = (basePath: string, leafPath: string) => {
    let joinedPath = path.join(basePath, leafPath)

    // TODO workaround for working with Windows delimiters (backslash) while on Unix/Linux
    const isWindows = os.platform() === 'win32'
    if (!isWindows) {
        joinedPath = joinedPath.replace(/\\/g, '/')
    }
    return joinedPath
}

export default joinPaths
