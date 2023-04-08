import Joi from "joi"

export interface ModManifestCarEntry {
    manufacturer: string
    model: string

    /**
     * Path to the root content directory for this car.
     *
     * The root content directory contains subdirectories such as
     * "Animation", "GUI", and "Vehicles".
     *
     * Note: This path is relative to the application root directory.
     * The path provided in the manifest file is relative to the mod archive root directory.
     */
    game_files_dir: string

    /**
     * Path to the vehicle .crd file.
     *
     * This path needs to be added to vehiclelist.lst as part of
     * the mod installation process. There is usually no need to
     * load or modify the actual file.
     */
    vehicle_list_file: string

    /**
     * Path to a plain-text file containing entries to be added to the file driveline.rg.
     *
     * Note: This path is relative to the application root directory.
     * The path provided in the manifest file is relative to the mod archive root directory.
     */
    driveline_entries_file: string
}


export const schema = Joi.object<ModManifest>({
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

interface ModManifest {
    manifest_version: string
    name: string
    version: string
    min_game_version: string
    author: string
    cars: ModManifestCarEntry[]
}

export default ModManifest
