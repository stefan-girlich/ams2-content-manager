import styled from 'styled-components'
import StyleableProps from '../../@types/StyleableProps'
import Button from '../atoms/Button'
import InputField from '../atoms/InputField'
import InputLabel from '../atoms/InputLabel'
import { OpenDialogOptions } from 'electron'

const Root = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
`

const InputFieldRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`

const InputFieldFillingRow = styled(InputField)`
    flex: 1;
`

const IconButton = styled(Button)`
    padding: 8px;
    margin-left: 2px;
`

interface Props extends StyleableProps {
    label: string
    filePath: string
    options: OpenDialogOptions
    // TODO add status: exists, readable, executable?
    onDialogOpenStateChange?(isDialogOpen: boolean): void
    onFilePathSelect(filePath: string): void
}

const noOp = (): void => undefined

const FilePathInput = ({
    label,
    filePath,
    options,
    onDialogOpenStateChange = noOp,
    onFilePathSelect,
    className,
}: Props) => {
    const onClick = async () => {
        onDialogOpenStateChange(true)
        const { canceled, filePaths } = await window.electronAPI.requestFileSelection(options)
        onDialogOpenStateChange(false)
        if (!canceled) onFilePathSelect(filePaths[0])
    }

    return (
        <Root className={className}>
            <InputLabel>{label}</InputLabel>
            <InputFieldRow>
                <InputFieldFillingRow disabled value={filePath} />
                <IconButton onClick={onClick} label="📂" />
            </InputFieldRow>
        </Root>
    )
}

export default FilePathInput
