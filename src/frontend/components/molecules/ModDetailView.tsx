import styled from 'styled-components'
import ModAndSyncStatus from '../../../common/@types/ModAndSyncStatus'
import StyleableProps from '../../@types/StyleableProps'
import CarModDataView from './CarModDataView'

const Root = styled.div`
    flex: 1;
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

            {!contents.manifest && <b>no manifest.yml found - values are parsed from README</b>}

            <h2>README file</h2>
            <span>{contents.readmeFilePath}</span>

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
