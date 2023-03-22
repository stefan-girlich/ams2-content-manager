import listModArchives from './backend/data/listModArchives'
import extractModArchive from './backend/data/loadModArchive'

// TODO move to dedicated test file structure, use test runner like Jest

const main = async () => {
    const filePaths = await listModArchives()
    console.log('MOD ARCHIVES: ', filePaths)

    for (const path of filePaths) {
        await extractModArchive(path)
    }

    // const testee = filePaths.find(path => path.includes('Lamborghini'))
    // const testee = filePaths.find(path => path.includes('Scuderia'))
    // extractModArchive(testee)
}

main()
