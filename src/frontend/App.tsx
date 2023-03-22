import ModContents from '../common/@types/ModContents'
import ModManager from './components/organisms/ModManager'

import './index.css'

// TODO move to own .d.ts file
declare global {
    interface Window {
        electronAPI: {
            // add your API methods and properties here
            listMods: () => Promise<ModContents[]>
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
