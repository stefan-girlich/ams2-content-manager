import styled, { css } from 'styled-components'
import { SyncStatus } from '../../../common/@types/ModAndSyncStatus'
import StyleableProps from '../../@types/StyleableProps'
import colors from '../../config/colors'

const Root = styled.div<{ status: SyncStatus }>`
    width: 9px;
    height: 9px;
    margin-left: 16px;
    background: lightgray;

    ${({ status }) => {
        if (status === 'not_synced' || status === 'missing_bootfiles')
            return css`
                background: ${colors.status.error};
            `
        if (status === 'synced')
            return css`
                background: ${colors.status.success};
            `
    }}
`

interface Props extends StyleableProps {
    status: SyncStatus
}

const SyncStatusMarker = ({ status, className }: Props) => {
    return <Root status={status} className={className}></Root>
}

export default SyncStatusMarker
