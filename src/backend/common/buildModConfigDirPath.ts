import { app } from 'electron'
import joinPaths from '../util/joinPaths'
import { MOD_CONFIGS_DIR, USER_ROOT_DIR } from './createModConfigsDir'

const buildModConfigDirPath = async (modName: string, parentDirPath?: string) => {
    if (!parentDirPath) parentDirPath = app.getPath('userData')
    const modConfigDir = joinPaths(parentDirPath, USER_ROOT_DIR, MOD_CONFIGS_DIR, modName)
    return modConfigDir
}

export default buildModConfigDirPath
