import styled from 'styled-components'
import StyleableProps from '../../@types/StyleableProps'
import colors from '../../config/colors'

interface Props extends StyleableProps {
    label: string
    onClick(): void
}

const Root = styled.button`
    padding: 8px 16px;
    border: 0;
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    color: ${colors.button.text.idle};
    background-color: ${colors.button.background.idle};

    :hover {
        color: ${colors.button.text.hover};
        background-color: ${colors.button.background.hover};
    }
`

const Button = ({ label, onClick, className }: Props) => {
    return (
        <Root onClick={onClick} className={className}>
            {label}
        </Root>
    )
}

export default Button
