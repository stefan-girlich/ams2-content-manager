import colors from '../../config/colors'
import styled from 'styled-components'

const InputField = styled.input`
    background: ${colors.inputField.background.idle};
    color: ${colors.inputField.text.idle};
    border: 1px solid ${colors.inputField.border.idle};
    font-size: 1rem;
    font-weight: 200;
    padding: 8px;

    :focus {
        background: ${colors.inputField.background.active};
        color: ${colors.inputField.text.active};
        border-color: ${colors.inputField.border.active};
        outline: none;
    }
`

export default InputField
