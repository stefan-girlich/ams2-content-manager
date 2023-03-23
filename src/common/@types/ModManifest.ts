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

interface ModManifest {
    manifest_version: string
    name: string
    version: string
    min_game_version: string
    author: string
    cars: ModManifestCarEntry[]
}

export default ModManifest
