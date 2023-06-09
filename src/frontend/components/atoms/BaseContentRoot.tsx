import styled from 'styled-components'
import colors from '../../config/colors'

const BaseContentRoot = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    background: ${colors.common.background};
    color: ${colors.common.text};
    padding: 48px;
`

export default BaseContentRoot
