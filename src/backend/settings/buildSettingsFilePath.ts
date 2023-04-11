import { app } from 'electron'
import joinPaths from '../util/joinPaths'

const userSettingsFileName = 'settings.json'

// TODO passing opt. param is only for tests => replace this param with env var
const buildSettingsFilePath = (parentDirPath?: string) => {
    if (!parentDirPath) {
        parentDirPath = app.getPath('userData')
    }

    return joinPaths(parentDirPath, userSettingsFileName)
}

export default buildSettingsFilePath