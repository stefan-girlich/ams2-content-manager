import { useEffect, useState } from 'react'
import styled from 'styled-components'
import StyleableProps from '../../@types/StyleableProps'
import colors from '../../config/colors'
import useModsList from '../../hooks/useModsList'
import PageContentRoot from '../atoms/PageContentRoot'
import ModDetailView from '../molecules/ModDetailView'
import ModsList from '../molecules/ModsList'
import ModInstallerOverlay from './ModInstallerOverlay'
import ContentRoot from '../atoms/ContentRoot'

const Root = styled(PageContentRoot)`
    display: flex;
    flex-direction: column;
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
            <ContentRoot>
                {data && (
                    <ModsList
                        data={data}
                        selectedIndex={selectedModIndex}
                        onSelect={onSelect}
                        onRequestReload={onRequestReload}
                    />
                )}
                {data?.length && <ModDetailView data={data[selectedModIndex]} />}
            </ContentRoot>

            <ModInstallerOverlay onInstallSuccess={onInstallSuccess} />
        </Root>
    )
}

export default ModManager
