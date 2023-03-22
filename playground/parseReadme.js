const fs = require('fs')

const CRD_LINE_REGEX = /^.*\.crd$/gim
const DRIVELINE_LINES_REGEX = /^RECORD.*$(\r\n|.)*?\r\n^\s*$^$/gim

const _parseReadme = async filePath => {
    const readmeContent = await fs.promises.readFile(filePath, { encoding: 'utf-8' })

    const crdFilePaths = readmeContent.match(CRD_LINE_REGEX)
    if (!crdFilePaths) throw new Error(`no .crd file paths found in file: ${filePath}`)

    const drivelineEntries = readmeContent.match(DRIVELINE_LINES_REGEX)
    if (!drivelineEntries) throw new Error(`no driveline entries found in file: ${filePath}`)

    return {
        crdFilePaths,
        drivelineEntries,
    }
}

const testCandidates = [
    'userdata/MODS/Ferrari 430 Scuderia AMS2 (2 cars 1.45)/README_Install_Ferrari_430SC_1.45.txt',
    'userdata/MODS/Lamborghini SCV12 v1.4.5.2/Readme.txt',
    'userdata/MODS/Ferrari_FXX-K v1.4.5/Readme.txt',
]

const main = async () => {
    for (const candidate of testCandidates) {
        console.log('========= ' + candidate + ' =========')

        const foo = await _parseReadme(candidate)

        console.log(foo.drivelineEntries)

        console.log(' ')
        console.log(' ')
        console.log(' ')
    }
}

main()
