import useModFileDragAndDrop from '../../../frontend/hooks/useModFileDragAndDrop'
import styled from 'styled-components'
import StyleableProps from '../../../frontend/@types/StyleableProps'
import useInstallMod from '../../../frontend/hooks/useInstallMod'
import { useEffect } from 'react'
import colors from '../../config/colors'
import { H1, H2, H3 } from '../atoms/headlines'
import Button from '../atoms/Button'

const Root = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.modal.backdrop};
`

const Modal = styled.div`
    width: 480px;
    padding: 32px;
    background: ${colors.modal.background};
    color: ${colors.common.text};
`

const ButtonsRoot = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 16px;
    margin-bottom: 32px;
`

const HintWhileDragging = styled(H2)`
    text-align: center;
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

    const installedSuccessfully = status === 'success'
    return (
        <Root className={className}>
            <Modal>

                {isDragging ? (
                    <HintWhileDragging>drop mod archive to install</HintWhileDragging>
                ) : (
                    <div>
                        <H1>Install mod?</H1>
                        <H2>{pendingFile?.name}</H2>
                        <ButtonsRoot>
                            <Button onClick={onCloseClick} label={installedSuccessfully ? 'close' : 'cancel'} />
                            {!installedSuccessfully && <Button onClick={onConfirmClick} label={'confirm'} />}
                        </ButtonsRoot>
                        <H3>installation status: {status}</H3>
                    </div>
                )}
            </Modal>
        </Root>
    )
}

export default ModInstallerOverlay
