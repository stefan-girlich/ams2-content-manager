import { OpenDialogOptions, OpenDialogReturnValue } from 'electron'
import { useState } from 'react'
import styled from 'styled-components'
import ModAndSyncStatus from '../common/@types/ModAndSyncStatus'
import UserSettings from '../common/@types/UserSettings'
import Header from './components/organisms/Header'
import ModManager from './components/organisms/ModManager'
import SettingsManager from './components/organisms/SettingsManager'
import './index.css'

// TODO move to own .d.ts file
declare global {
    interface Window {
        electronAPI: {
            listMods: () => Promise<ModAndSyncStatus[]>
            installMod: (modArchiveFilePath: string) => Promise<void>
            loadUserSettings: () => Promise<UserSettings>
            saveUserSettings: (data: UserSettings) => Promise<UserSettings>
            requestFileSelection: (options: OpenDialogOptions) => Promise<OpenDialogReturnValue>
        }
    }
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const SCREENS = ['mods', 'settings'] as const
export type Screen = (typeof SCREENS)[number]

const App = () => {
    const [screen, setScreen] = useState<Screen>(SCREENS[1])
    const onScreenSelect = (selectedScreen: Screen) => setScreen(selectedScreen)
    return (
        <Root>
            <Header activeScreen={screen} onScreenSelect={onScreenSelect} />
            {screen === 'mods' && <ModManager />}
            {screen === 'settings' && <SettingsManager />}
        </Root>
    )
}

export default App
