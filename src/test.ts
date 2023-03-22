import listModArchives from './backend/data/listModArchives'
import installModFromArchive from './backend/data/installModFromArchive'
import { MODS_DIR } from './config'

// TODO move to dedicated test file structure, use test runner like Jest

const main = async () => {
    const filePaths = await listModArchives()
    console.log('MOD ARCHIVES: ', filePaths)

    // for (const path of filePaths) {
    //     const contents = await installModFromArchive(path, MODS_DIR)
    //     console.log(contents.drivelineEntries)
    // }

    // const testee = filePaths.find(path => path.includes('Lamborghini'))
    // const testee = filePaths.find(path => path.includes('Scuderia'))
    const testee = filePaths.find(path => path.includes('FXX'))
    await installModFromArchive(testee, MODS_DIR)
}

main()
