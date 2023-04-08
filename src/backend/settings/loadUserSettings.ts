import fs from 'fs'
import { app } from 'electron'
import joinPaths from '../util/joinPaths'
import { readFile, readJsonFile } from '../common/fileOps'

const userSettingsFileName = 'settings.json'

const buildSettingsFilePath = (parentDirPath?: string) => {
    if (!parentDirPath) {
        parentDirPath = app.getPath('userData')
    }

    return joinPaths(parentDirPath, userSettingsFileName)
}

const saveSettings = () => {

}

const loadUserSettings = async (parentDirPath?: string) => {
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