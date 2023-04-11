import { app } from 'electron'
import joinPaths from '../util/joinPaths'

const userSettingsFileName = 'settings.json'

const buildSettingsFilePath = (parentDirPath?: string) => {
    if (!parentDirPath) {
        parentDirPath = app.getPath('userData')
    }

    return joinPaths(parentDirPath, userSettingsFileName)
}

export default buildSettingsFilePath
