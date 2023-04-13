import { useMemo } from 'react'
import styled from 'styled-components'
import ModAndSyncStatus from '../../../common/@types/ModAndSyncStatus'
import StyleableProps from '../../@types/StyleableProps'
import Button from '../atoms/Button'
import ModsListSublist from './ModsListSublist'

const Root = styled.div`
    width: 300px;
    margin-right: 128px;
`

const Toolbar = styled.div`
    margin-top: auto;
`

interface Props extends StyleableProps {
    data: ModAndSyncStatus[]
    selectedModName: string
    onSelect(name: string): void
    onRequestReload(): void
}

const ModsList = ({ data, selectedModName, onSelect, onRequestReload, className }: Props) => {
    const modsByCategory = useMemo(() => {
        return {
            car: data.filter(x => !!x.contents.carData),
            bootfiles: data.filter(x => !!x.contents.bootfilesData),
            other: data.filter(x => x.contents.type === 'unknown'),
        }
    }, [data])

    return (
        <Root className={className}>
            <ModsListSublist
                data={modsByCategory.car}
                title={'Cars'}
                selectedModName={selectedModName}
                onSelect={onSelect}
            />

            <ModsListSublist
                data={modsByCategory.bootfiles}
                title={'Bootfiles'}
                selectedModName={selectedModName}
                onSelect={onSelect}
            />

            <ModsListSublist
                data={modsByCategory.other}
                title={'Other'}
                selectedModName={selectedModName}
                onSelect={onSelect}
            />

            <Toolbar>
                <Button label="reload mods" onClick={() => onRequestReload()} />
            </Toolbar>
        </Root>
    )
}

export default ModsList
