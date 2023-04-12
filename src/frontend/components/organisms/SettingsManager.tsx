import { OpenDialogOptions } from 'electron'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import StyleableProps from '../../@types/StyleableProps'
import colors from '../../config/colors'
import useUserSettings from '../../hooks/useUserSettings'
import BaseContentRoot from '../atoms/BaseContentRoot'
import PageContentRoot from '../atoms/PageContentRoot'
import FilePathInput from '../molecules/FilePathInput'

const _7zExeDialogOptions: OpenDialogOptions = {
    properties: ['openFile'],
    filters: [
        {
            name: '7z.exe file',
            extensions: ['.exe'],
        },
    ],
}

const gameDirDialogOptions: OpenDialogOptions = {
    properties: ['openDirectory'],
}

const Root = styled(PageContentRoot)`
    display: flex;
    flex-direction: column;
    background: ${colors.common.background};
    color: ${colors.common.text};
`

const ContentRoot = styled(BaseContentRoot)`
    display: flex;
    flex-direction: column;
`

const BlockingOverlay = styled.div`
    position: absolute;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(100, 100, 100, 0.8); // TODO from theme
`

const SettingsFilePathInput = styled(FilePathInput)`
    width: 512px;
`

const SettingsManager = ({ className }: StyleableProps) => {
    // TODO handle error
    const { data, status, load, save } = useUserSettings()
    const [isNativeDialogOpen, setNativeDialogOpen] = useState(false)

    useEffect(() => {
        load()
    }, [])

    const onDialogOpenStateChange = (open: boolean) => setNativeDialogOpen(open)

    const onGameDirPathSelect = (gameDir: string) => save({ ...data, gameDir })
    const on7zExeFilePathSelect = (_7zExeFile: string) => save({ ...data, _7zExeFile })

    if (!data) return null

    return (
        <Root className={className}>
            <ContentRoot>
                <SettingsFilePathInput
                    label={'game directory path'}
                    filePath={data.gameDir}
                    options={gameDirDialogOptions}
                    onDialogOpenStateChange={onDialogOpenStateChange}
                    onFilePathSelect={onGameDirPathSelect}
                />

                <SettingsFilePathInput
                    label={'7z.exe file path'}
                    filePath={data._7zExeFile}
                    options={_7zExeDialogOptions}
                    onDialogOpenStateChange={onDialogOpenStateChange}
                    onFilePathSelect={on7zExeFilePathSelect}
                />
            </ContentRoot>
            {isNativeDialogOpen && <BlockingOverlay />}
        </Root>
    )
}

export default SettingsManager
