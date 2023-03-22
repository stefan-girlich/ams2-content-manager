import * as fs from 'fs'
import * as path from 'path'
import ModContents from '../../common/@types/ModContents'
import loadInstalledMod from './loadInstalledMod'

const BOOT_FILES_DIR_REGEX = '__bootfiles_.+'

const listMods = async (modsDirPath: string): Promise<ModContents[]> => {
    const files = await fs.promises.readdir(modsDirPath)

    const loadedModContents = await Promise.all(
        files.map(async fileName => {
            const fullPath = path.join(modsDirPath, fileName)
            const stat = await fs.promises.lstat(fullPath)

            const isDir = stat.isDirectory()
            const isBootfiles = !!fileName.match(BOOT_FILES_DIR_REGEX)
            if (!isDir || isBootfiles) return null

            return loadInstalledMod(fullPath)
        })
    )

    console.log(loadedModContents)
    

    return loadedModContents.filter(item => item !== null)
}

export default listMods
