import styled from 'styled-components'
import StyleableProps from '../../@types/StyleableProps'

interface Props extends StyleableProps {
    children: React.ReactNode
}

const Root = styled.div`
    flex: 1;
`

const PageContentRoot = ({ children, className }: Props) => {
    return <Root className={className}>{children}</Root>
}

export default PageContentRoot
