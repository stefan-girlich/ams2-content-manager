import * as fs from 'fs'
import * as path from 'path'
import ModAndSyncStatus, { SyncStatus } from '../../common/@types/ModAndSyncStatus'
import ModContents from '../../common/@types/ModContents'
import areAllTrue from '../util/everyAsync'
import createUnknownFileContents from './createUnknownFileContents'
import isDrivelineEntryPresent from './isDrivelineEntryPresent'
import isVehicleListEntryPresent from './isVehicleListEntryPresent'
import loadBootfiles from './loadBootfiles'
import loadInstalledMod from './loadInstalledMod'

const BOOT_FILES_DIR_REGEX = '__bootfiles_.+'

const _mapSyncStatus = async (modContents: ModContents, bootfiles: ModContents | null): ModAndSyncStatus => {
    // TODO optimize: load bootfiles files into memory once

    const buildResult = (status: SyncStatus) => ({
        name: modContents.name,
        contents: modContents,
        status,
    })
    if (!bootfiles) return buildResult('missing_bootfiles')
    if (modContents.type !== 'car_mod') return buildResult('static')

    const {
        bootfilesData: { vehicleListFilePath, drivelineFilePath },
    } = bootfiles
    const { vehicleListEntries, drivelineEntries } = modContents.carData

    const isVehicleListSynced = await areAllTrue(
        vehicleListEntries.map(entry => isVehicleListEntryPresent(vehicleListFilePath, entry))
    )

    const isDrivelineSynced = await areAllTrue(
        drivelineEntries.map(entry => isDrivelineEntryPresent(drivelineFilePath, entry))
    )

    console.log(vehicleListEntries, drivelineEntries, isVehicleListSynced, isDrivelineSynced)

    const status: SyncStatus = isVehicleListSynced && isDrivelineSynced ? 'synced' : 'not_synced'
    return buildResult(status)
}

const listMods = async (modsDirPath: string): Promise<ModAndSyncStatus[]> => {
    const files = await fs.promises.readdir(modsDirPath)

    const loadedModsAndBootfilesInclHidden = await Promise.all(
        files.map(async fileName => {
            if (fileName.startsWith('.')) return null
            const fullPath = path.join(modsDirPath, fileName)
            const stat = await fs.promises.lstat(fullPath)

            const isDir = stat.isDirectory()
            if (!isDir) return createUnknownFileContents(fullPath)

            const isBootfiles = !!fileName.match(BOOT_FILES_DIR_REGEX)
            if (isBootfiles) return loadBootfiles(fullPath)

            return loadInstalledMod(fullPath)
        })
    )

    const loadedMods = loadedModsAndBootfilesInclHidden.filter(item => item !== null)

    const bootfilesEntries = loadedMods.filter(mod => mod.type === 'bootfiles')
    let bootfiles: ModContents | null = null
    if (bootfilesEntries.length === 0) {
        console.error(`Expected 1 bootfiles dir, got: 0`)
    } else if (bootfilesEntries.length > 1) {
        bootfiles = bootfilesEntries[bootfilesEntries.length - 1]
        console.warn(`Expected 1 bootfiles dir, got: ${bootfilesEntries.length}. Using latest: ${bootfiles.name}`)
    } else {
        bootfiles = bootfilesEntries[0]
    }

    return Promise.all(loadedMods.map(mod => _mapSyncStatus(mod, bootfiles)))
}

export default listMods
