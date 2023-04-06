import ModAndSyncStatus from '../common/@types/ModAndSyncStatus'
import ModManager from './components/organisms/ModManager'

import './index.css'

// TODO move to own .d.ts file
declare global {
    interface Window {
        electronAPI: {
            listMods: () => Promise<ModAndSyncStatus[]>
            installMod: (modArchiveFilePath: string) => Promise<void>
        }
    }
}

// document.querySelector('#list-mods-btn').addEventListener('click', async () => {
//     // TODO this fails
//     const foo = await window.electronAPI.listMods()
//     console.log('foo', foo)

//     // console.log('>>>>>>>>>>>>', files)
// })

const App = () => {
    return (
        <>
            <h2>Content Manager for AMS2</h2>

            <ModManager />
        </>
    )
}

export default App
