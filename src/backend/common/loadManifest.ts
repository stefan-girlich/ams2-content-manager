import fs from 'fs'
import Joi from 'joi'
import path from 'path'
import yaml from 'yaml'
import ModManifest, { ModManifestCarEntry, schema } from '../../common/@types/ModManifest'
import isFileReadable from '../util/isFileReadable'
import joinPaths from '../util/joinPaths'

export const MANIFEST_FILENAME = 'manifest.yml'



export const findManifestFilePath = async (directory: string) => {
    const manifestFilePath = path.join(directory, MANIFEST_FILENAME)

    const isManifestFileReadable = await isFileReadable(manifestFilePath)
    if (!isManifestFileReadable) {
        console.warn('no manifest file found via path: ', manifestFilePath)
        return null
    }
    return manifestFilePath
}

const loadManifest = async (extractModRootDir: string): Promise<ModManifest | null> => {
    const manifestFilePath = await findManifestFilePath(extractModRootDir)
    const manifestFileContent = await fs.promises.readFile(manifestFilePath, { encoding: 'utf-8' })
    const manifestContentUnvalidated = yaml.parse(manifestFileContent)

    const { value: manifestData, error } = schema.validate(manifestContentUnvalidated)
    if (error) throw error
    const pathsRelativeToRootDir = await Promise.all(
        manifestData.cars.map(async car => {
            const gameFilesDirPath = joinPaths(extractModRootDir, car.game_files_dir).replace(/\\/g, '/')
            const gameDirStat = await fs.promises.lstat(gameFilesDirPath)
            if (!gameDirStat.isDirectory()) throw new Error(`not a directory: ${gameFilesDirPath}`)

            const drivelinesFilePath = joinPaths(extractModRootDir, car.driveline_entries_file)
            const drivelinesStat = await fs.promises.lstat(drivelinesFilePath)
            if (!drivelinesStat.isFile()) throw new Error(`not a file: ${drivelinesFilePath}`)

            return {
                gameFilesDirPath,
                drivelinesFilePath,
            }
        })
    )

    const carsWithUpdatedPaths: ModManifestCarEntry[] = manifestData.cars.map((car, index) => {
        return {
            ...car,
            driveline_entries_file: pathsRelativeToRootDir[index].drivelinesFilePath,
            game_files_dir: pathsRelativeToRootDir[index].gameFilesDirPath,
        }
    })

    return {
        ...manifestData,
        cars: carsWithUpdatedPaths,
    }
}

export default loadManifest
