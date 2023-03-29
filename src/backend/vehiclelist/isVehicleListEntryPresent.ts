import fs from 'fs'

const isVehicleListEntryPresent = async (vehicleListFilePath: string, expectedEntry: string) => {
    const fileContents = await fs.promises.readFile(vehicleListFilePath, 'utf-8')
    return fileContents.includes(expectedEntry)
}

export default isVehicleListEntryPresent
