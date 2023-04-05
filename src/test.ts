import listModsAndSyncStatus from './backend/data/listMods'
import loadInstalledMod from './backend/data/loadInstalledMod'
import addDrivelineEntry from './backend/driveline/addDrivelineEntry'
import removeExistingDrivelineEntries from './backend/driveline/removeExistingDrivelineEntries'
import joinPaths from './backend/util/joinPaths'
import { MODS_DIR } from './config'

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
    const modContents = await loadInstalledMod(modDirPath)

    const drivelineFilePath = joinPaths(
        'userdata',
        'MODS',
        '__bootfiles_1.4.6.1',
        'vehicles',
        'physics',
        'driveline',
        'driveline.rg'
    )

    await removeExistingDrivelineEntries(drivelineFilePath, modContents.carData.id)

    for (const entry of modContents.carData.drivelineEntries) {
        addDrivelineEntry(drivelineFilePath, entry, modContents.carData.id)
    }
}

main()
