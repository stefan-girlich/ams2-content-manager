import { useEffect, useState } from 'react'
import styled from 'styled-components'
import StyleableProps from '../../@types/StyleableProps'
import colors from '../../config/colors'
import useModsList from '../../hooks/useModsList'
import PageContentRoot from '../atoms/PageContentRoot'
import ModDetailView from '../molecules/ModDetailView'
import ModsList from '../molecules/ModsList'
import ModInstallerOverlay from './ModInstallerOverlay'

const Root = styled(PageContentRoot)`
    display: flex;
    flex-direction: column;
`

const MainContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    background: ${colors.common.background};
    color: ${colors.common.text};
`

const ModManager = ({ className }: StyleableProps) => {
    const { fetch, data, status } = useModsList()
    const [selectedModIndex, setSelectedModIndex] = useState(0)

    useEffect(() => {
        fetch()
    }, [])

    const onInstallSuccess = () => fetch()

    const onSelect = (index: number) => setSelectedModIndex(index)
    const onRequestReload = () => fetch()

    return (
        <Root className={className}>
            <MainContent>
                {data && (
                    <ModsList
                        data={data}
                        selectedIndex={selectedModIndex}
                        onSelect={onSelect}
                        onRequestReload={onRequestReload}
                    />
                )}
                {data?.length && <ModDetailView data={data[selectedModIndex]} />}
            </MainContent>

            <ModInstallerOverlay onInstallSuccess={onInstallSuccess} />
        </Root>
    )
}

export default ModManager
