import { useState } from 'react'
import UserSettings from '../../common/@types/UserSettings'
import OperationStatus from '../@types/OperationStatus'

interface Result {
    load(): void
    save(data: UserSettings): Promise<void>
    data: UserSettings | null
    status: OperationStatus
}


const useUserSettings = (): Result => {
    const [status, setStatus] = useState<OperationStatus>('idle')
    const [data, setData] = useState<UserSettings>(null)
    const load = async () => {
        try {
            setStatus('pending')
            const loadedSettings = await window.electronAPI.loadUserSettings()
            setData(loadedSettings)
        } catch (e) {
            console.error(e)
            setData(null)
            setStatus('error')
        }
    }
    const save = async (newData: UserSettings) => {
        try {
            setStatus('pending')
            await window.electronAPI.saveUserSettings(newData)
        } catch (e) {
            console.error(e)
            setData(newData)
            setStatus('error')
        }
    }

    return {
        load,
        save,
        data,
        status,
    }
}

export default useUserSettings
