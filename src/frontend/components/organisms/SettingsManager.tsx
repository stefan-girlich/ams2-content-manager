import styled from 'styled-components'
import StyleableProps from '../../@types/StyleableProps'
import colors from '../../config/colors'

const Root = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background: ${colors.menu.background};
`

const SettingsManager = ({ className }: StyleableProps) => {
    // const onSelect = (index: number) => setSelectedModIndex(index)

    return <Root className={className}>settings</Root>
}

export default SettingsManager
