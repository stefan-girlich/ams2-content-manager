import fs from 'fs'
import { MOD_RESOURCES_DIR } from '../../config'
import joinPaths from '../util/joinPaths'

const getModConfigDirPath = async (modName: string, checkIfExists = false) => {
    const modConfigDir = joinPaths(MOD_RESOURCES_DIR, modName)
    if (checkIfExists) {
        const stat = await fs.promises.lstat(modConfigDir)
        const isDir = stat.isDirectory()
        if (!isDir) return null
    }
    return modConfigDir
}

export default getModConfigDirPath
