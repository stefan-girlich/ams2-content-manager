import UserSettings from '../../common/@types/UserSettings'
import { fileExists, readJsonFile } from '../common/fileOps'
import buildSettingsFilePath from './buildUserSettings'

const loadUserSettings = async (parentDirPath?: string): Promise<UserSettings> => {
    const filePath = buildSettingsFilePath(parentDirPath)

    const settingsFileExists = await fileExists(filePath)
    if (!settingsFileExists) {
        console.info(`No user settings file found for path: ${filePath}`)
        return null
    }

    const settings = await readJsonFile(filePath)
    // TODO validate schema and contents
    return settings as UserSettings
}

export default loadUserSettings
