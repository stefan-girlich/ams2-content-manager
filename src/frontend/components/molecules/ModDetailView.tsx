import styled from 'styled-components'
import ModContents from '../../../common/@types/ModContents'
import StyleableProps from '../../@types/StyleableProps'

const Root = styled.div`
    flex: 1;
`

interface Props extends StyleableProps {
    data: ModContents
}

const ModDetailView = ({ data, className }: Props) => {
    return (
        <Root className={className}>
            <h1>{data.dirName}</h1>

            <h2>README file</h2>
            <span>{data.readmeFilePath}</span>

            <h2>.crd file paths</h2>
            <ul>
                {data.crdFilePaths.map(filePath => (
                    <li key={filePath}>{filePath}</li>
                ))}
            </ul>

            <h2>driveline entries</h2>
            <ul>
                {data.drivelineEntries.map((entry, index) => (
                    <li key={index}>
                        <pre>{entry}</pre>
                    </li>
                ))}
            </ul>
        </Root>
    )
}

export default ModDetailView
