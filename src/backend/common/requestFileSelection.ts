import { OpenDialogOptions, dialog } from 'electron'

const requestFileSelection = async (options: OpenDialogOptions) => {
    return await dialog.showOpenDialog(options)
}

export default requestFileSelection
