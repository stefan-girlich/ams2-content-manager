import styled from 'styled-components'
import StyleableProps from '../../@types/StyleableProps'
import Button from '../atoms/Button'
import InputField from '../atoms/InputField'
import InputLabel from '../atoms/InputLabel'

const Root = styled.div`
    display: flex;
    flex-direction: column;
`

const InputFieldRow = styled.div`
    display: flex;
    flex-direction: row;
`

const IconButton = styled(Button)`
    padding: 8px;
    margin-left: 2px;
`

interface Props extends StyleableProps {
    label: string
    filePath: string
    // TODO add status: exists, readable, executable?
    onDialogOpenStateChange?(isDialogOpen: boolean): void
    onFilePathSelect(filePath: string): void
}

const noOp = (): void => undefined

const FilePathInput = ({ label, filePath, onDialogOpenStateChange = noOp, onFilePathSelect, className }: Props) => {
    const onClick = async () => {
        onDialogOpenStateChange(true)
        const { canceled, filePaths } = await window.electronAPI.requestFileSelection()
        onDialogOpenStateChange(false)
        if (!canceled) onFilePathSelect(filePaths[0])
    }

    return (
        <Root className={className}>
            <InputLabel>{label}</InputLabel>
            <InputFieldRow>
                <InputField disabled>{filePath}</InputField>
                <IconButton onClick={onClick} label="📂" />
            </InputFieldRow>
        </Root>
    )
}

export default FilePathInput
