import fs from 'fs'
import { DRIVELINE_ENTRY_REGEX } from '../common/loadInstalledMod'
import { buildMarkerLine } from './addDrivelineEntry'

const removeExistingDrivelineEntries = async (drivelineFilePath: string, carModId: string) => {
    const fileContents = await fs.promises.readFile(drivelineFilePath, 'utf-8')
    const markerLine = buildMarkerLine(carModId)

    const entryRegex = new RegExp(`^${markerLine}${DRIVELINE_ENTRY_REGEX.source}`, 'm')

    let updatedFileContents = fileContents
    let removedEntryCount = 0

    /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
    while (true) {
        const match = entryRegex.exec(updatedFileContents)
        if (!match) break

        const entryStartIndex = match.index
        const entryLength = match[0].length
        const entryEndIndex = entryStartIndex + entryLength
        const entry = fileContents.substring(entryStartIndex, entryEndIndex)
        updatedFileContents = updatedFileContents.replace(entry, '')
        removedEntryCount++
    }

    console.info(`removed ${removedEntryCount}  entries for car " ${carModId}"`)

    if (removedEntryCount > 0) await fs.promises.writeFile(drivelineFilePath, updatedFileContents, 'utf-8')
}

export default removeExistingDrivelineEntries
