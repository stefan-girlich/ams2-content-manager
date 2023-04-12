import { app } from 'electron'
import fs from 'fs'
import joinPaths from '../util/joinPaths'

export const USER_ROOT_DIR = 'user'
export const MOD_CONFIGS_DIR = 'mod_configs'

const createUserDirs = async (parentDirPath?: string) => {
    if (!parentDirPath) parentDirPath = app.getPath('userData')
    const allModConfigsDir = joinPaths(parentDirPath, USER_ROOT_DIR, MOD_CONFIGS_DIR)
    console.info(`creating mods config dir: ${allModConfigsDir}`)
    await fs.promises.mkdir(allModConfigsDir, { recursive: true })
}

export default createUserDirs
