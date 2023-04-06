import { useState } from 'react'
import OperationStatus from '../@types/OperationStatus'

interface Result {
    installMod(modArchiveFilePath: string): void
    reset(): void
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

    const reset = () => setStatus('idle')

    return {
        installMod,
        reset,
        status,
    }
}

export default useInstallMod
