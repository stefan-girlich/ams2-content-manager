import ModContents from '../../common/@types/ModContents'

const findBootfiles = (loadedMods: ModContents[]) => {
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
    return bootfiles
}

export default findBootfiles
