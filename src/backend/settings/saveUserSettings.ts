import { writeJsonFile } from '../common/fileOps'
import buildUserSettingsFilePath from './buildUserSettingsFilePath'
import UserSettings, { schema } from '../../common/@types/UserSettings'

const saveUserSettings = async (data: UserSettings, parentDirPath?: string) => {
    const filePath = buildUserSettingsFilePath(parentDirPath)

    const { error, value } = schema.validate(data)
    if (error) throw error

    await writeJsonFile(filePath, value)
    return value
}

export default saveUserSettings
