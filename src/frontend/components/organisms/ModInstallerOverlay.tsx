import useModFileDragAndDrop from '../../../frontend/hooks/useModFileDragAndDrop'
import styled from 'styled-components'
import StyleableProps from '../../../frontend/@types/StyleableProps'
import useInstallMod from '../../../frontend/hooks/useInstallMod'
import { useEffect } from 'react'

const Root = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: white;
    padding: 32px;
`

const Modal = styled.div`
    border: 1px solid gray;
    background: white;
`

interface Props extends StyleableProps {
    onInstallSuccess(): void
}

const ModInstallerOverlay = ({ onInstallSuccess, className }: Props) => {
    const { pendingFile, isDragging, clear } = useModFileDragAndDrop()
    const { installMod, status, reset } = useInstallMod()

    const showModal = pendingFile || isDragging

    useEffect(() => {
        if (!pendingFile && status === 'success') {
            reset()
            onInstallSuccess()
        }
    }, [pendingFile, status, reset, onInstallSuccess])
    if (!showModal) return null

    const onConfirmClick = () => {
        installMod(pendingFile.path)
    }
    const onCloseClick = () => clear()

    return (
        <Root className={className}>
            <Modal>
                <button onClick={onCloseClick}>close</button>
                {isDragging ? (
                    <h1>drop mod archive to install</h1>
                ) : (
                    <div>
                        <h1>Install mod?</h1>
                        <h2>{pendingFile.name}</h2>
                        <button onClick={onConfirmClick}>confirm</button>
                        <h3>installation status: {status}</h3>
                    </div>
                )}
            </Modal>
        </Root>
    )
}

export default ModInstallerOverlay
