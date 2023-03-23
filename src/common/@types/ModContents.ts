import ModManifest from './ModManifest'

export default interface ModContents {
    /**
     * path to the mod's root directory (^= root of mod archive contents)
     */
    path: string
    name: string
    readmeFilePath: string | null
    vehicleListEntries: string[]
    drivelineEntries: string[]
    manifest: ModManifest | null
}
