import UserSettings from '../../common/@types/UserSettings'
import { fileExists, readJsonFile } from '../common/fileOps'
import buildUserSettingsFilePath from './buildUserSettingsFilePath'

const DEFAULT_SETTINGS: UserSettings = {
    version: '1.0',
    _7zExeFile: null,
    gameDir: null,
}

const loadUserSettings = async (parentDirPath?: string): Promise<UserSettings> => {
    const filePath = buildUserSettingsFilePath(parentDirPath)

    const settingsFileExists = await fileExists(filePath)
    if (!settingsFileExists) {
        console.info(`No user settings file found for path: ${filePath}. Returning empty defaults`)
        return DEFAULT_SETTINGS
    }

    const settings = await readJsonFile(filePath)
    // TODO validate schema and contents
    return settings as UserSettings
}

export default loadUserSettings
