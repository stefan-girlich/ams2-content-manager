import fs from 'fs'
import path from 'path'
import ModContents from '../../common/@types/ModContents'
import isFileReadable from '../util/isFileReadable'
import joinPaths from '../util/joinPaths'
import findReadmeFile from './findReadmeFile'

const loadBootfiles = async (bootfilesDirPath: string): Promise<ModContents> => {
    const readmeFilePath = await findReadmeFile(bootfilesDirPath)

    const bootfilesDirStat = await fs.promises.lstat(bootfilesDirPath)
    if (!bootfilesDirStat.isDirectory()) throw new Error(`not a directory: "${bootfilesDirPath}`)

    const vehicleListFilePath = joinPaths(bootfilesDirPath, 'vehicles', 'vehiclelist.lst')
    const isVehicleFileReadable = await isFileReadable(vehicleListFilePath)
    if (!isVehicleFileReadable) throw new Error(`cannot read file: ${vehicleListFilePath}`)

    const drivelineFilePath = joinPaths(bootfilesDirPath, 'vehicles', 'physics', 'driveline', 'driveline.rg')
    const isDrivelineFileReadable = await isFileReadable(drivelineFilePath)
    if (!isDrivelineFileReadable) throw new Error(`cannot read file: ${drivelineFilePath}`)

    return {
        path: bootfilesDirPath,
        name: path.basename(bootfilesDirPath),
        type: 'bootfiles',
        version: null, // TODO determine version
        readmeFilePath,
        manifest: null,
        carData: null,
        bootfilesData: {
            vehicleListFilePath,
            drivelineFilePath,
        },
    }
}

export default loadBootfiles
