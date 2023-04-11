import fs from 'fs'
import UserSettings from '../../common/@types/UserSettings'
import { readJsonFile } from '../common/fileOps'
import buildSettingsFilePath from './buildUserSettings'

const loadUserSettings = async (parentDirPath?: string): Promise<UserSettings> => {
    const filePath = buildSettingsFilePath(parentDirPath)

    const stat = await fs.promises.lstat(filePath)
    const fileExists = stat.isFile()
    if (!fileExists) {
        console.info(`No config file found, creating one: ${filePath}`)
        return null
    }

    const settings = await readJsonFile(filePath)

    // TODO validate
    return settings
}

export default loadUserSettings
