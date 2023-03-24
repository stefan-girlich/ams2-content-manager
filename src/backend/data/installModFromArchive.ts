import _7z from '7zip-min'
import fs from 'fs'
import os from 'os'
import path from 'path'
import ModContents from '../../common/@types/ModContents'
import { MODS_DIR, MOD_RESOURCES_DIR } from '../../config'
import joinPaths from '../util/joinPaths'
import findReadmeFile from './findReadmeFile'

const _extractModArchive = async (filePath: string) => {
    const osTmpDir = os.tmpdir()
    const tmpDirForMod = await fs.promises.mkdtemp(joinPaths(osTmpDir, 'cm-for-ams2-tmp'))

    return new Promise<string>((resolve, reject) => {
        _7z.unpack(filePath, tmpDirForMod, err => {
            if (err) return reject(err)
            resolve(tmpDirForMod)
        })
    })
}

const _findSingleDirectoryPath = async (rootDirectory: string) => {
    const files = await fs.promises.readdir(rootDirectory)

    const dirsOrNulls = await Promise.all(
        files.map(async file => {
            const stat = await fs.promises.lstat(joinPaths(rootDirectory, file))
            const isDir = stat.isDirectory()
            if (!isDir) return null
            return file
        })
    )

    const dirs = dirsOrNulls.filter(dir => dir !== null)
    if (dirs.length === 0) throw new Error(`no directories in path: ${rootDirectory}`)
    if (dirs.length > 1) throw new Error(`more than one directory in path: ${rootDirectory}`)
    return joinPaths(rootDirectory, dirs[0])
}

const _copyModContent = async (extractionDir: string): Promise<void> => {
    // TODO add support for manifest provided in archive
    // const manifestSrcPath = await findManifestFilePath(extractionDir)
    // if (manifestSrcPath) {
    //     const manifestDestPath = _buildDestinationPath(manifestSrcPath)
    //     fs.promises.copyFile(manifestSrcPath, manifestDestPath)
    //     return
    // }

    // TODO use other dir name for resources dir?
    const gameDirSrcPath = await _findSingleDirectoryPath(extractionDir)
    const gameDirName = path.basename(gameDirSrcPath)
    const readmeSrcPath = await findReadmeFile(extractionDir)
    const readmeFileName = path.basename(readmeSrcPath)

    const modResourcesDir = joinPaths(MOD_RESOURCES_DIR, gameDirName)
    await fs.promises.mkdir(modResourcesDir, { recursive: true })

    const readmeDestPath = joinPaths(modResourcesDir, readmeFileName)
    await fs.promises.copyFile(readmeSrcPath, readmeDestPath)

    const gameDirDestPath = joinPaths(MODS_DIR, gameDirName)

    // TODO file bug report? fs.promises.cp fails with code "EISDIR" despite "recursive: true"
    return new Promise((resolve, reject) => {
        fs.cp(gameDirSrcPath, gameDirDestPath, { recursive: true }, err => {
            if (err) {
                reject(err)
                return
            }
            resolve()
        })
    })
}

// TODO rename "installModFromArchive", rename file
const installModFromArchive = async (filePath: string, modsDirPath: string): Promise<ModContents> => {
    const extractionTargetDir = await _extractModArchive(filePath)

    await _copyModContent(extractionTargetDir)
    // return loadInstalledMod(targetDir)
    return null
}

export default installModFromArchive
