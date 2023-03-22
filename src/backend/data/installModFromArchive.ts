import _7z from '7zip-min'
import * as path from 'path'
import ModContents from '../../common/@types/ModContents'
import loadInstalledMod from './loadInstalledMod'

const _extractModArchive = (filePath: string, modsDir: string) => {
    const fileName = path.parse(filePath).name
    const targetDir = path.join(modsDir, fileName)
    return new Promise<string>((resolve, reject) => {
        _7z.unpack(filePath, targetDir, err => {
            if (err) return reject(err)
            resolve(targetDir)
        })
    })
}

// TODO rename "installModFromArchive", rename file
const installModFromArchive = async (filePath: string, modsDirPath: string): Promise<ModContents> => {
    const targetDir = await _extractModArchive(filePath, modsDirPath)
    console.log('🚀 ~ file: loadModArchive.ts:31 ~ loadModArchive ~ targetDir:', targetDir)
    return loadInstalledMod(targetDir)
}

export default installModFromArchive
