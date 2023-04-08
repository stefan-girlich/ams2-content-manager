import colors from '../../config/colors'
import styled from 'styled-components'

const Code = styled.pre`
    padding: 8px;
    margin-bottom: 32px;
    font-size: 0.6rem;
    letter-spacing: 0.025rem;
    padding: 12px;
    color: ${colors.list.itemText.idle}; // TODO
    border: 1px solid ${colors.common.textOnHighlightedBackground}; // TODO
    border-radius: 4px;
`

export default Code
