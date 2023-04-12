import { dialog } from 'electron'

const requestFileSelection = async () => {
    // TODO parametrize
    return await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {
                name: '7z.exe file',
                extensions: ['.exe'],
            },
        ],
    })
}

export default requestFileSelection
