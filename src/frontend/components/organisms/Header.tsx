import styled, { css } from 'styled-components'
import StyleableProps from '../../@types/StyleableProps'
import colors from '../../config/colors'

const Root = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background: ${colors.menu.background};
`

const Logo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 0 16px 48px;
    color: ${colors.common.text};
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 200;
    letter-spacing: 0.05rem;
`

const LogoDetail = styled.div`
    font-weight: 600;
    color: ${colors.common.textHighlighted};
`

const VersionTag = styled.div`
    padding: 0.15rem 0.2rem;
    margin-left: 16px;
    border-radius: 0.3rem;
    background: ${colors.common.highlightedBackground};
    color: ${colors.common.textOnHighlightedBackground};
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.01rem;
`

const Menu = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const MenuItem = styled.li<{ active?: boolean }>`
    padding: 16px;
    color: ${colors.menu.text.idle};
    font-weight: 200;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    font-size: 1rem;
    cursor: pointer;

    :hover {
        color: ${colors.menu.text.hover};
    }

    ${({ active }) =>
        active &&
        css`
            font-weight: 400;
            color: ${colors.menu.text.active};
            :hover {
                color: ${colors.menu.text.hover};
            }
        `}
`

const Header = ({ className }: StyleableProps) => {
    // const onSelect = (index: number) => setSelectedModIndex(index)

    return (
        <Root className={className}>
            <Logo>
                <LogoDetail>Content Manager</LogoDetail>&nbsp; for AMS2
                <VersionTag>pre-alpha</VersionTag>
            </Logo>
            <Menu>
                <MenuItem active>Mods</MenuItem>
                <MenuItem>Tools</MenuItem>
                <MenuItem>Settings</MenuItem>
            </Menu>
        </Root>
    )
}

export default Header
