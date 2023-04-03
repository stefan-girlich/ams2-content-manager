import ModManifest from './ModManifest'

export type ContentType = 'car_mod' | 'bootfiles' | 'unknown'

/**
 * Configuration data for all cars in a mod.
 */
export interface CarsData {
    id: string
    vehicleListEntries: string[]
    drivelineEntries: string[]
}

export interface BootfilesData {
    vehicleListFilePath: string
    drivelineFilePath: string
}

/**
 * Contents for a single mod.
 *
 * This data has been prepared for displaying and mod installation.
 * See {@link ModManifest} for underlying raw data.
 */
export default interface ModContents {
    /**
     * path to the mod's root directory (^= root of mod archive contents)
     */
    path: string
    name: string
    type: ContentType
    readmeFilePath: string | null
    manifest: ModManifest | null
    carData: CarsData | null
    bootfilesData: BootfilesData | null
}
