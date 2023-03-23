import fs from 'fs'
import Joi from 'joi'
import path from 'path'
import yaml from 'yaml'
import ModManifest, { ModManifestCarEntry } from '../../common/@types/ModManifest'
import isFileReadable from '../util/isFileReadable'
import joinPaths from '../util/joinPaths'

const MANIFEST_FILENAME = 'manifest.yml'

const MANIFEST_SCHEMA = Joi.object<ModManifest>({
    manifest_version: Joi.string().valid('1.0').required(),
    name: Joi.string().min(1).required(),
    version: Joi.string().min(1).required(),
    min_game_version: Joi.string()
        .regex(/^\d(\.\d)*$/)
        .required(),
    author: Joi.string().min(1).required(),
    cars: Joi.array()
        .items(
            Joi.object({
                manufacturer: Joi.string().min(1).required(),
                model: Joi.string().min(1).required(),
                game_files_dir: Joi.string().min(1).required(),
                vehicle_list_file: Joi.string().min(1).required(),
                driveline_entries_file: Joi.string().min(1).required(),
            })
        )
        .min(1)
        .required(),
})

const loadManifest = async (extractModRootDir: string): Promise<ModManifest | null> => {
    const manifestFilePath = path.join(extractModRootDir, MANIFEST_FILENAME)

    const isManifestFileReadable = await isFileReadable(manifestFilePath)
    if (!isManifestFileReadable) {
        console.warn('no manifest file found via path: ', manifestFilePath)
        return null
    }

    const manifestFileContent = await fs.promises.readFile(manifestFilePath, { encoding: 'utf-8' })
    const manifestContentUnvalidated = yaml.parse(manifestFileContent)

    const { value: manifestData, error } = MANIFEST_SCHEMA.validate(manifestContentUnvalidated)
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
