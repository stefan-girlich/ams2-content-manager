import fs from 'fs'

const isDrivelineEntryPresent = async (drivelinesFilePath: string, entry: string) => {
    const fileContents = await fs.promises.readFile(drivelinesFilePath, 'utf-8')
    return fileContents.includes(entry)
}

export default isDrivelineEntryPresent
