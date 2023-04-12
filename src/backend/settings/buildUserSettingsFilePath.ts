import { app } from 'electron'
import { USER_ROOT_DIR } from '../common/createModConfigsDir'
import joinPaths from '../util/joinPaths'

const userSettingsFileName = 'settings.json'

const buildUserSettingsFilePath = (parentDirPath?: string) => {
    if (!parentDirPath) {
        parentDirPath = app.getPath('userData')
    }

    return joinPaths(parentDirPath, USER_ROOT_DIR, userSettingsFileName)
}

export default buildUserSettingsFilePath
