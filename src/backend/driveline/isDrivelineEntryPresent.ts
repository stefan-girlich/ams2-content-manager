import fs from 'fs'

const isDrivelineEntryPresent = async (drivelinesFilePath: string, entry: string) => {
    const fileContents = await fs.promises.readFile(drivelinesFilePath, 'utf-8')
    // console.dir(fileContents.substr(fileContents.length - 400)) // DEBUG , works like "tail -500"
    return fileContents.includes(entry)
}

export default isDrivelineEntryPresent
