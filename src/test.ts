import extractModArchive from './backend/common/extractModArchive'
import listModsAndSyncStatus from './backend/common/listModsAndSyncStatus'
import loadInstalledMod from './backend/common/loadInstalledMod'
import addDrivelineEntry from './backend/driveline/addDrivelineEntry'
import isDrivelineEntryPresent from './backend/driveline/isDrivelineEntryPresent'
import removeExistingDrivelineEntries from './backend/driveline/removeExistingDrivelineEntries'
import UserSettings from './common/@types/UserSettings'
import loadUserSettings from './backend/settings/loadUserSettings'
import saveUserSettings from './backend/settings/saveUserSettings'
import joinPaths from './backend/util/joinPaths'

export const MODS_DIR = joinPaths('userdata', 'MODS')

// TODO move to dedicated test file structure, use test runner like Jest

const main = async () => {
    console.log('main()')
    // const testeePath = joinPaths('userdata', 'archives', 'Lamborghini SCV12 v1.4.5.2.7z')
    // await installModFromArchive(testeePath)

    // const mods = await listModsAndSyncStatus(MODS_DIR)
    // console.log(mods)

    // ==========================  test driveline file ops  ==========================

    // const modDirPath = joinPaths('userdata', 'resources', 'Lamborghini SCV12 v1.4.5.2')
    const modDirPath = joinPaths('userdata', 'resources', 'Ferrari_FXX-K v1.4.5')
    const userSettingsDirPath = joinPaths('userdata', 'user-settings')
    // const modContents = await loadInstalledMod(modDirPath)

    // const drivelineFilePath = joinPaths(
    //     'userdata',
    //     'MODS',
    //     '__bootfiles_1.4.6.1',
    //     'vehicles',
    //     'physics',
    //     'driveline',
    //     'driveline.rg'
    // )

    // await removeExistingDrivelineEntries(drivelineFilePath, modContents.carData.id)

    // for (const entry of modContents.carData.drivelineEntries) {
    //     addDrivelineEntry(drivelineFilePath, entry, modContents.carData.id)
    // }

    // ==========================  test: is entry in driveline.rg?  ==========================
    // const entry = modContents.carData.drivelineEntries
    // const isIt = await isDrivelineEntryPresent(drivelineFilePath, entry[0])
    // console.log(isIt)

    // ==========================  test: extract archive to tmp dir via native 7z.exe  ==========================
    // const testeePath = '"C:\\Users\\Arno\\projects\\ams2-content-manager\\userdata\\archives\\Ferrari_FXX-K v1.4.5.7z"'
    // await extractModArchive(testeePath)

    // ==========================  test: read user settings  ==========================
    const settings = await loadUserSettings(userSettingsDirPath)
    console.log('checked for settings:', settings)

    await saveUserSettings({
        _7zExeFile: 'dummy_7z.exe',
        gameDir: 'dummy_game_dir'
    }, userSettingsDirPath)

    const settingsReloaded = await loadUserSettings(userSettingsDirPath)
    console.log('updated settings:', settingsReloaded)
}

main()
