import styled, { css } from 'styled-components'
import ModAndSyncStatus, { SyncStatus } from '../../../common/@types/ModAndSyncStatus'
import StyleableProps from '../../@types/StyleableProps'

const Root = styled.div`
    width: 400px;
    margin-right: 32px;
`

const List = styled.ul``

const ListItem = styled.li<{ selected: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    border: 1px solid transparent;
    margin-bottom: 8px;
    cursor: pointer;

    :hover {
        border: 1px solid gray;
    }

    ${({ selected }) => {
        if (selected)
            return css`
                border: 1px solid black;
            `
    }}
`

const SyncStatusMarker = styled.div<{ status: SyncStatus }>`
    border-radius: 100%;
    width: 12px;
    height: 12px;
    margin-left: 16px;
    background: lightgray;

    ${({ status }) => {
        if (status === 'not_synced' || status === 'missing_bootfiles')
            return css`
                background: red;
            `
        if (status === 'synced')
            return css`
                background: green;
            `
    }}
`

interface Props extends StyleableProps {
    data: ModAndSyncStatus[]
    selectedIndex: number
    onSelect(index: number): void
}

const ModsList = ({ data, selectedIndex, onSelect, className }: Props) => {
    console.log(data)
    
    return (
        <Root className={className}>
            <List>
                {data.map((mod, index) => (
                    <ListItem key={index} selected={selectedIndex === index} onClick={() => onSelect(index)}>
                        {mod.name}
                        <SyncStatusMarker status={mod.status} />
                    </ListItem>
                ))}
            </List>
        </Root>
    )
}

export default ModsList
