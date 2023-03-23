import styled from 'styled-components'
import { CarsData } from '../../../common/@types/ModContents'
import StyleableProps from '../../@types/StyleableProps'

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
    data: CarsData
}

const CarModDataView = ({ data, className }: Props) => {
    return (
        <Root className={className}>
            <h3>.crd file paths</h3>
            <ul>
                {data.vehicleListEntries.map(filePath => (
                    <li key={filePath}>{filePath}</li>
                ))}
            </ul>

            <h3>driveline entries</h3>
            <ul>
                {data.drivelineEntries.map((entry, index) => (
                    <DrivelineEntryListItem key={index}>
                        <pre>{entry}</pre>
                    </DrivelineEntryListItem>
                ))}
            </ul>
        </Root>
    )
}

export default CarModDataView
