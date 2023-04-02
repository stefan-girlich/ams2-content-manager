import fs from 'fs'
import { WIN_LINEBREAK } from '../../config'

const addVehicleListEntry = (vehicleListFilePath: string, entry: string) => {
    const lineForEntry = WIN_LINEBREAK + entry
    return fs.promises.appendFile(vehicleListFilePath, lineForEntry, 'utf-8')
}

export default addVehicleListEntry
