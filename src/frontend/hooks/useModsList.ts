import { useState } from 'react'
import ModAndSyncStatus from '../../common/@types/ModAndSyncStatus'
import OperationStatus from '../@types/OperationStatus'

interface Result {
    fetch(): void
    data: ModAndSyncStatus[]
    status: OperationStatus
}

const useModsList = (): Result => {
    const [status, setStatus] = useState<OperationStatus>('idle')
    const [data, setData] = useState<ModAndSyncStatus[]>(null)
    const fetch = async () => {
        try {
            setStatus('pending')
            const mods = await window.electronAPI.listMods()
            setData(mods)
            setStatus('success')
        } catch (e) {
            console.error(e)
            setData([])
            setStatus('error')
        }
    }

    return {
        fetch,
        data,
        status,
    }
}

export default useModsList
