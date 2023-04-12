// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { OpenDialogOptions, contextBridge, ipcRenderer } from 'electron'
import UserSettings from './common/@types/UserSettings'

contextBridge.exposeInMainWorld('electronAPI', {
    listMods: () => ipcRenderer.invoke('list-mods'),
    installMod: (modArchiveFilePath: string) => ipcRenderer.invoke('install-mod', modArchiveFilePath),
    loadUserSettings: () => ipcRenderer.invoke('load-user-settings'),
    saveUserSettings: (data: UserSettings) => ipcRenderer.invoke('save-user-settings', data),
    requestFileSelection: (options: OpenDialogOptions) => ipcRenderer.invoke('request-file-selection', options),
})
