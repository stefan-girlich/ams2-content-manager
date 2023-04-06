import styled from 'styled-components'
import ModAndSyncStatus from '../common/@types/ModAndSyncStatus'
import Header from './components/organisms/Header'
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

const Root = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const App = () => {
    return (
        <Root>
            <Header />
            <ModManager />
        </Root>
    )
}

export default App
