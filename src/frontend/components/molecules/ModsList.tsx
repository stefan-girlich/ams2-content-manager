import styled, { css } from 'styled-components'
import ModAndSyncStatus from '../../../common/@types/ModAndSyncStatus'
import StyleableProps from '../../@types/StyleableProps'
import colors from '../../config/colors'
import SyncStatusMarker from './SyncStatusMarker'
import Button from '../atoms/Button'
import { useMemo } from 'react'

const Root = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    margin-right: 128px;
`

const ListSectionTitle = styled.div`
    color: ${colors.list.sectionTitle};
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: 200;
    letter-spacing: 0.1rem;
    margin-left: 20px;
    margin-bottom: 16px;
`

const List = styled.ul`
    margin-bottom: 72px;
`

const ListItem = styled.li<{ selected: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    margin-bottom: 8px;
    border-left: 4px solid transparent;
    color: ${colors.list.itemText.idle};
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 200;
    letter-spacing: 0.1rem;
    cursor: pointer;

    > * {
        cursor: pointer;
    }

    :hover {
        color: ${colors.list.itemText.active};
    }

    ${({ selected }) => {
        if (selected)
            return css`
                border-color: ${colors.list.itemBorder.active};
                color: ${colors.list.itemText.active};
            `
    }}
`

const ModName = styled.div``

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
        }
    }, [data])

    return (
        <Root className={className}>
            <ListSectionTitle>Cars</ListSectionTitle>
            <List>
                {modsByCategory.car.map((mod, index) => (
                    <ListItem key={index} selected={selectedIndex === index} onClick={() => onSelect(index)}>
                        <ModName>{mod.name}</ModName>
                        <SyncStatusMarker status={mod.status} />
                    </ListItem>
                ))}
            </List>
            <ListSectionTitle>Bootfiles</ListSectionTitle>
            <List>
                {modsByCategory.bootfiles.map((mod, index) => (
                    <ListItem
                        key={index}
                        selected={selectedIndex === index + modsByCategory.car.length}
                        onClick={() => onSelect(index + modsByCategory.car.length)}
                    >
                        <ModName>{mod.name}</ModName>
                        <SyncStatusMarker status={mod.status} />
                    </ListItem>
                ))}
            </List>
            <Toolbar>
                <Button label="reload mods" onClick={() => onRequestReload()} />
            </Toolbar>
        </Root>
    )
}

export default ModsList
