import listModsAndSyncStatus from './backend/data/listMods'
import loadInstalledMod from './backend/data/loadInstalledMod'
import addDrivelineEntry from './backend/driveline/addDrivelineEntry'
import findDrivelineEntryLocation from './backend/driveline/findDrivelineEntryLocation'
import joinPaths from './backend/util/joinPaths'
import { MODS_DIR } from './config'

// TODO move to dedicated test file structure, use test runner like Jest

const main = async () => {
    console.log('main()')
    // const testeePath = joinPaths('userdata', 'archives', 'Lamborghini SCV12 v1.4.5.2.7z')
    // await installModFromArchive(testeePath)

    // const isVehicleListPresent = await isVehicleListEntryPresent(
    //     joinPaths(MODS_DIR, '__bootfiles_1.4.6.1/vehicles/vehiclelist.lst'),
    //     'vehicles\\CART_Reynard_2KI\\CART_Reynard_2KI_Honda_SW.crd'
    // )
    // console.log('🚀 ~ file: test.ts:39 ~ main ~ isVehicleListPresent:', isVehicleListPresent)

    // const mods = await listModsAndSyncStatus(MODS_DIR)
    // console.log(mods)

    // ==========================  test driveline file ops  ==========================

    const modDirPath = joinPaths('userdata', 'resources', 'Lamborghini SCV12 v1.4.5.2')
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

    for (const entry of modContents.carData.drivelineEntries) {
        addDrivelineEntry(drivelineFilePath, entry, modContents.carData.id)
    }

    // findDrivelineEntryLocation(drivelineFilePath , )
}

main()
