import { useState } from 'react'
import OperationStatus from '../@types/OperationStatus'

interface Result {
    installMod(modArchiveFilePath: string): void
    status: OperationStatus
}

const useInstallMod = (): Result => {
    const [status, setStatus] = useState<OperationStatus>('idle')
    const installMod = async (modArchiveFilePath: string) => {
        try {
            setStatus('pending')
            await window.electronAPI.installMod(modArchiveFilePath)
            setStatus('success')
        } catch (e) {
            console.error(e)
            setStatus('error')
        }
    }

    return {
        installMod,
        status,
    }
}

export default useInstallMod
