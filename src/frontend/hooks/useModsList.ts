import { useState } from 'react'
import ModContents from '../../common/@types/ModContents'
import OperationStatus from '../@types/OperationStatus'

interface Result {
    fetch(): void
    data: ModContents[]
    status: OperationStatus
}

const useModsList = (): Result => {
    const [status, setStatus] = useState<OperationStatus>('idle')
    const [data, setData] = useState<ModContents[]>(null)
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
