import child_process from 'child_process'
import fs from 'fs'
import os from 'os'
import joinPaths from '../util/joinPaths'

const extractModArchive = async (archiveFilePath: string): Promise<string> => {
    const exePath = '"C:\\Program Files\\7-Zip\\7z.exe"'


    const osTmpDir = os.tmpdir()
    const tmpDirForMod = await fs.promises.mkdtemp(joinPaths(osTmpDir, 'cm-for-ams2-tmp'))
    // console.log('>>>>>', tmpDirForMod)

    const command = `${exePath} x ${archiveFilePath} -o"${tmpDirForMod}"`
    console.log('>>>>>', command)

    return new Promise((resolve, reject) => {
        child_process.exec(command, (err: any, data: any) => {
            if (err) {
                console.error(err)
                console.error(data.toString());
                reject(err)
                return
            }
            console.log(data.toString())
            resolve(tmpDirForMod)
        });
    })
}

export default extractModArchive
