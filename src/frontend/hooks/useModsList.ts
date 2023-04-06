import { useState } from 'react'
import ModAndSyncStatus from '../../common/@types/ModAndSyncStatus'
import OperationStatus from '../@types/OperationStatus'

interface Result {
    fetch(): void
    data: ModAndSyncStatus[]
    status: OperationStatus
}

// WORKAROUND for fallback mode
// TODO remove or move to backend
const parseModName = (name: string) => {
    const versionRegEx = /\sv\d+.*/i
    const versionMatch = name.match(versionRegEx)
    if (!versionMatch)
        return {
            name: name.replace(/__/g, '').replace('_', ' '),
        }

    return {
        name: name.replace(versionRegEx, '').replace('_', ' '),
        version: versionMatch[0],
    }
}

const useModsList = (): Result => {
    const [status, setStatus] = useState<OperationStatus>('idle')
    const [data, setData] = useState<ModAndSyncStatus[]>(null)
    const fetch = async () => {
        try {
            setStatus('pending')
            const mods = await window.electronAPI.listMods()
            mods.forEach(mod => {
                const { name, version } = parseModName(mod.name)
                mod.name = name
                mod.contents.version = version
            })
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
