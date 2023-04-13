import styled from 'styled-components'
import ModAndSyncStatus from '../../../common/@types/ModAndSyncStatus'
import StyleableProps from '../../@types/StyleableProps'
import colors from '../../config/colors'
import Code from '../atoms/Code'
import { H1, H2 } from '../atoms/headlines'
import CarModDataView from './CarModDataView'

const Root = styled.div`
    flex: 1;
    font-weight: 200;

    b {
        display: inline-block;
        color: ${colors.list.itemText.idle}; // TODO
        font-weight: 300;
        font-size: 0.8rem;
        border: 0.5px solid ${colors.list.itemText.idle}; // TODO
        border-radius: 4px;
        padding: 8px 12px;
        /* margin-bottom: 32px; */
    }
`

interface Props extends StyleableProps {
    data: ModAndSyncStatus
}

const ModDetailView = ({ data, className }: Props) => {
    const { contents } = data
    return (
        <Root className={className}>
            <H1>{data.name}</H1>

            {!contents.manifest && <b>no manifest.yml found - values parsed from README</b>}

            <H2>README file</H2>
            <Code>{contents.readmeFilePath}</Code>

            {!!contents.carData && (
                <>
                    <H2>Car data</H2>
                    <CarModDataView data={contents.carData} />
                </>
            )}
        </Root>
    )
}

export default ModDetailView
