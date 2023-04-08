import styled from 'styled-components'
import ModAndSyncStatus from '../../../common/@types/ModAndSyncStatus'
import StyleableProps from '../../@types/StyleableProps'
import CarModDataView from './CarModDataView'
import colors from '../../config/colors'
import Code from '../atoms/Code'

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
    h1 {
        color: ${colors.list.sectionTitle}; // TODO
        font-weight: 400;
        font-size: 2rem;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        margin-top: 0;
    }
    h2 {
        margin-top: 48px;
        margin-bottom: 24px;
        font-weight: 300;
        font-size: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 0.05rem;
    }
    h3 {
        margin-top: 0px;
        margin-bottom: 8px;
        font-weight: 200;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.05rem;
    }
`

const DrivelineEntryListItem = styled.li`
    border-left: 4px solid black;
    padding: 8px 48px;
    margin-bottom: 32px;
    font-size: 0.6rem;
`

interface Props extends StyleableProps {
    data: ModAndSyncStatus
}

const ModDetailView = ({ data, className }: Props) => {
    const { contents } = data
    return (
        <Root className={className}>
            <h1>{data.name}</h1>

            {!contents.manifest && <b>no manifest.yml found - values parsed from README</b>}

            <h2>README file</h2>
            <Code>{contents.readmeFilePath}</Code>

            {!!contents.carData && (
                <>
                    <h2>Car data</h2>
                    <CarModDataView data={contents.carData} />
                </>
            )}
        </Root>
    )
}

export default ModDetailView
