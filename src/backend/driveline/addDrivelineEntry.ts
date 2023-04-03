import fs from 'fs'
import { WIN_LINEBREAK } from '../../config'

const END_LINE_REGEX = /^\s*END$/gm

const splitAt = (input: string, index: number) => [input.slice(0, index), input.slice(index)]

// TODO move to own file
export const buildMarkerLine = (carId: string) => `# injected entry for car: ${carId}${WIN_LINEBREAK}`

const addDrivelineEntry = async (drivelineFilePath: string, entry: string, carId: string) => {
    const fileContents = await fs.promises.readFile(drivelineFilePath, { encoding: 'utf-8' })

    const endLineMatch = END_LINE_REGEX.exec(fileContents)
    if (!endLineMatch) throw new Error('unable to find END line')
    const [partBeforeEnd, endPart] = splitAt(fileContents, endLineMatch.index)

    const updatedFileContents =
        partBeforeEnd + WIN_LINEBREAK + WIN_LINEBREAK + buildMarkerLine(carId) + entry + WIN_LINEBREAK + endPart

    // TODO backup file
    fs.promises.writeFile(drivelineFilePath, updatedFileContents, 'utf-8')
}

export default addDrivelineEntry
