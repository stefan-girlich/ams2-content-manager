import styled from 'styled-components'
import colors from '../../config/colors'

const Hint = styled.div`
    display: inline-block;
    color: ${colors.list.itemText.idle}; // TODO
    font-weight: 300;
    font-size: 1rem;
    line-height: 1.5;
    border: 0.5px solid ${colors.list.itemText.idle}; // TODO
    border-radius: 4px;
    padding: 8px 12px;
    margin-bottom: 32px;
`

export default Hint
