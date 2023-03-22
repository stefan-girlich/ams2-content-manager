import styled, { css } from 'styled-components'
import ModContents from '../../../common/@types/ModContents'
import StyleableProps from '../../@types/StyleableProps'

const Root = styled.div`
    width: 400px;
    margin-right: 32px;
`

const List = styled.ul``

const ListItem = styled.li<{ selected: boolean }>`
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

interface Props extends StyleableProps {
    data: ModContents[]
    selectedIndex: number
    onSelect(index: number): void
}

const ModsList = ({ data, selectedIndex, onSelect, className }: Props) => {
    return (
        <Root className={className}>
            <List>
                {data.map((mod, index) => (
                    <ListItem key={index} selected={selectedIndex === index} onClick={() => onSelect(index)}>
                        {mod.dirName}
                    </ListItem>
                ))}
            </List>
        </Root>
    )
}

export default ModsList
