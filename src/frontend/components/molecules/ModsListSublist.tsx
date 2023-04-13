import styled, { css } from 'styled-components'
import ModAndSyncStatus from '../../../common/@types/ModAndSyncStatus'
import StyleableProps from '../../@types/StyleableProps'
import colors from '../../config/colors'
import SyncStatusMarker from './SyncStatusMarker'

const Root = styled.div`
    flex: 1;
`

const Title = styled.div`
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

const ModName = styled.div`
    white-space: nowrap;
`

interface Props extends StyleableProps {
    data: ModAndSyncStatus[]
    title: string
    selectedModName: string
    onSelect(name: string): void
}

const ModsListSublist = ({ data, title, selectedModName, onSelect, className }: Props) => {
    return (
        <Root className={className}>
            <Title>{title}</Title>
            <List>
                {data.map((mod, index) => (
                    <ListItem key={index} selected={selectedModName === mod.name} onClick={() => onSelect(mod.name)}>
                        <ModName>{mod.name}</ModName>
                        <SyncStatusMarker status={mod.status} />
                    </ListItem>
                ))}
            </List>
        </Root>
    )
}

export default ModsListSublist
