import styled from 'styled-components'
import ModsList from './ModsList'

const Root = styled.div`
    background: green;
`

const ModManager = () => {
    return (
        <Root>
            ModManager
            <ModsList />
        </Root>
    )
}

export default ModManager
