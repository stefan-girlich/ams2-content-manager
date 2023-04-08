import * as fs from 'fs'
import * as path from 'path'
import ModAndSyncStatus, { SyncStatus } from '../../common/@types/ModAndSyncStatus'
import ModContents from '../../common/@types/ModContents'
import isDrivelineEntryPresent from '../driveline/isDrivelineEntryPresent'
import areAllTrue from '../util/everyAsync'
import createUnknownFileContents from './createUnknownFileContents'
import findBootfiles from './findBootfiles'
import isVehicleListEntryPresent from '../vehiclelist/isVehicleListEntryPresent'
import loadBootfiles from './loadBootfiles'
import loadInstalledMod from './loadInstalledMod'

const BOOT_FILES_DIR_REGEX = '__bootfiles_.+'

const _mapSyncStatus = async (modContents: ModContents, bootfiles: ModContents | null): Promise<ModAndSyncStatus> => {
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

    const status: SyncStatus = isVehicleListSynced && isDrivelineSynced ? 'synced' : 'not_synced'
    return buildResult(status)
}

export const listMods = async (modsDirPath: string): Promise<ModContents[]> => {
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

    return loadedModsAndBootfilesInclHidden.filter(item => item !== null)
}

const listModsAndSyncStatus = async (modsDirPath: string): Promise<ModAndSyncStatus[]> => {
    const loadedMods = await listMods(modsDirPath)
    const bootfiles = findBootfiles(loadedMods)
    return Promise.all(loadedMods.map(mod => _mapSyncStatus(mod, bootfiles)))
}

export default listModsAndSyncStatus
