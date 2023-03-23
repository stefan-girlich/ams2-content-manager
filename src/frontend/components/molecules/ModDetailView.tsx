import styled from 'styled-components'
import ModContents from '../../../common/@types/ModContents'
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
    data: ModContents
}

const ModDetailView = ({ data, className }: Props) => {
    return (
        <Root className={className}>
            <h1>{data.name}</h1>

            {!data.manifest && <b>no manifest.yml found - values are parsed from README</b>}

            <h2>README file</h2>
            <span>{data.readmeFilePath}</span>

            {!!data.carData && (
                <>
                    <h2>Car data</h2>
                    <CarModDataView data={data.carData} />
                </>
            )}
        </Root>
    )
}

export default ModDetailView
