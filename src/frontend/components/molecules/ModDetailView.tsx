import styled from 'styled-components'
import ModAndSyncStatus from '../../../common/@types/ModAndSyncStatus'
import StyleableProps from '../../@types/StyleableProps'
import Code from '../atoms/Code'
import Hint from '../atoms/Hint'
import { H1, H2 } from '../atoms/headlines'
import CarModDataView from './CarModDataView'

const Root = styled.div`
    flex: 1;
    font-weight: 200;
`

interface Props extends StyleableProps {
    data: ModAndSyncStatus
}

const ModDetailView = ({ data, className }: Props) => {
    const { contents } = data
    const isUnknownDir = contents.type === 'unknown'
    return (
        <Root className={className}>
            <H1>{data.name}</H1>

            {isUnknownDir && (
                <Hint>
                    <b>Unknown file</b>
                    <br />
                    This file or folder in your MODS folder is not managed by Content Manager.
                    <br />
                    You can use this mod if you manually maintain its entries in the AMS2 game files.
                </Hint>
            )}

            {!isUnknownDir && (
                <>
                    {!contents.manifest && <Hint>no manifest.yml found - values parsed from README</Hint>}

                    <H2>README file</H2>
                    <Code>{contents.readmeFilePath}</Code>

                    {!!contents.carData && (
                        <>
                            <H2>Car data</H2>
                            <CarModDataView data={contents.carData} />
                        </>
                    )}
                </>
            )}
        </Root>
    )
}

export default ModDetailView
