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
    selectedIndex: number
    onSelect(index: number): void
    onRequestReload(): void
}

const ModsList = ({ data, selectedIndex, onSelect, onRequestReload, className }: Props) => {
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
                selectedIndex={selectedIndex}
                indexOffset={0}
                onSelect={onSelect}
            />

            <ModsListSublist
                data={modsByCategory.bootfiles}
                title={'Bootfiles'}
                selectedIndex={selectedIndex}
                indexOffset={modsByCategory.car.length}
                onSelect={onSelect}
            />

            <ModsListSublist
                data={modsByCategory.other}
                title={'Other'}
                selectedIndex={selectedIndex}
                indexOffset={modsByCategory.car.length + modsByCategory.bootfiles.length}
                onSelect={onSelect}
            />

            <Toolbar>
                <Button label="reload mods" onClick={() => onRequestReload()} />
            </Toolbar>
        </Root>
    )
}

export default ModsList
