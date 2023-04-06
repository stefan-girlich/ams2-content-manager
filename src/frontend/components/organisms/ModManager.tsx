import { useEffect, useState } from 'react'
import styled from 'styled-components'
import StyleableProps from '../../@types/StyleableProps'
import useModsList from '../../hooks/useModsList'
import ModDetailView from '../molecules/ModDetailView'
import ModsList from '../molecules/ModsList'
import ModInstallerOverlay from './ModInstallerOverlay'

const Root = styled.div`
    display: flex;
    flex-direction: column;
`

const Toolbar = styled.div``

const MainContent = styled.div`
    display: flex;
    flex-direction: row;
`

const ModManager = ({ className }: StyleableProps) => {
    const { fetch, data, status } = useModsList()
    const [selectedModIndex, setSelectedModIndex] = useState(0)

    useEffect(() => {
        fetch()
    }, [])

    const onInstallSuccess = () => fetch()

    const onSelect = (index: number) => setSelectedModIndex(index)

    return (
        <Root className={className}>
            <Toolbar>
                <button onClick={() => fetch()}>reload mods</button>
            </Toolbar>
            <MainContent>
                {data && <ModsList data={data} selectedIndex={selectedModIndex} onSelect={onSelect} />}
                {data?.length && <ModDetailView data={data[selectedModIndex]} />}
            </MainContent>

            <ModInstallerOverlay onInstallSuccess={onInstallSuccess} />
        </Root>
    )
}

export default ModManager
