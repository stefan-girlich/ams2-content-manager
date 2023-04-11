import { useState } from 'react'
import UserSettings from '../../common/@types/UserSettings'
import OperationStatus from '../@types/OperationStatus'

interface Result {
    load(): void
    save(data: UserSettings): Promise<void>
    data: UserSettings
    status: OperationStatus
}

const useUserSettings = (): Result => {
    const [status, setStatus] = useState<OperationStatus>('idle')
    const [data, setData] = useState<UserSettings>(null)
    const load = async () => {
        try {
            setStatus('pending')
            const settings = await window.electronAPI.loadUserSettings()
            setData(settings)
            setStatus('success')
        } catch (e) {
            console.error(e)
            setData(null)
            setStatus('error')
        }
    }
    const save = async (data: UserSettings) => {
        try {
            setStatus('pending')
            await window.electronAPI.saveUserSettings(data)
            setData(data)
            setStatus('success')
        } catch (e) {
            console.error(e)
            setData(null)
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
