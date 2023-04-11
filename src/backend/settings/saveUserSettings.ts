import { writeJsonFile } from '../common/fileOps'
import buildSettingsFilePath from './buildUserSettings'
import UserSettings, { schema } from './entity/UserSettings'

const saveUserSettings = async (data: UserSettings, parentDirPath?: string) => {
    const filePath = buildSettingsFilePath(parentDirPath)

    const { error, value } = schema.validate(data)
    if (error) throw error

    await writeJsonFile(filePath, value)
    return value
}

export default saveUserSettings
