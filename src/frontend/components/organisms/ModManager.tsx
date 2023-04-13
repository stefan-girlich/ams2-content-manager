import { useEffect, useState } from 'react'
import styled from 'styled-components'
import StyleableProps from '../../@types/StyleableProps'
import useModsList from '../../hooks/useModsList'
import BaseContentRoot from '../atoms/BaseContentRoot'
import PageContentRoot from '../atoms/PageContentRoot'
import ModDetailView from '../molecules/ModDetailView'
import ModsList from '../molecules/ModsList'
import ModInstallerOverlay from './ModInstallerOverlay'

const Root = styled(PageContentRoot)`
    display: flex;
    flex-direction: column;
`

const ContentRoot = styled(BaseContentRoot)`
    display: flex;
    flex-direction: row;
`

const ModManager = ({ className }: StyleableProps) => {
    const { fetch, data, status } = useModsList()
    const [selectedModIndex, setSelectedModIndex] = useState(0)
    console.log(data)
    

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
