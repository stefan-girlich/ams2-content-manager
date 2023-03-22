import { useEffect, useState } from 'react'
import styled from 'styled-components'
import StyleableProps from '../../@types/StyleableProps'
import useModsList from '../../hooks/useModsList'
import ModsList from '../molecules/ModsList'
import ModDetailView from '../molecules/ModDetailView'

const Root = styled.div`
    display: flex;
    flex-direction: row;
`

const ModManager = ({ className }: StyleableProps) => {
    const { fetch, data, status } = useModsList()
    const [selectedModIndex, setSelectedModIndex] = useState(0)

    useEffect(() => {
        fetch()
    }, [])

    const onSelect = (index: number) => setSelectedModIndex(index)

    return (
        <Root className={className}>
            {data && <ModsList data={data} selectedIndex={selectedModIndex} onSelect={onSelect} />}
            {data?.length && <ModDetailView data={data[selectedModIndex]} />}
        </Root>
    )
}

export default ModManager
