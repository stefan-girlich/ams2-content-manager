import { useEffect, useMemo, useState } from 'react'
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
    const [selectedModName, setSelectedModName] = useState<string>(null)

    useEffect(() => {
        fetch()
    }, [])

    const onInstallSuccess = () => fetch()

    const onSelect = (name: string) => setSelectedModName(name)
    const onRequestReload = () => fetch()

    const selectedMod = useMemo(() => {
        if (!data) return null
        if (!selectedModName) {
            return data.length ? data[0] : null
        }
        return data.find(({ name }) => name === selectedModName)
    }, [data, selectedModName])

    return (
        <Root className={className}>
            <ContentRoot>
                {data && (
                    <ModsList
                        data={data}
                        selectedModName={selectedModName}
                        onSelect={onSelect}
                        onRequestReload={onRequestReload}
                    />
                )}
                {selectedMod && <ModDetailView data={selectedMod} />}
            </ContentRoot>

            <ModInstallerOverlay onInstallSuccess={onInstallSuccess} />
        </Root>
    )
}

export default ModManager
