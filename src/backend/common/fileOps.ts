import fs from 'fs'

const encoding = 'utf-8'

export const fileExists = async (path: string, isDir = false) => {
    try {
        const stat = await fs.promises.stat(path)
        if (isDir) {
            return stat.isDirectory()
        } else {
            return stat.isFile()
        }
    } catch {
        return false
    }
}
export const readFile = (path: string) => fs.promises.readFile(path, { encoding })
export const readJsonFile = async (path: string) => {
    const contentsString = await readFile(path)
    return JSON.parse(contentsString)
}
export const writeFile = async (path: string, contents: string) => fs.promises.writeFile(path, contents, 'utf-8')
export const writeJsonFile = async (path: string, data: Record<string, any>) => {
    const jsonString = JSON.stringify(data, null, 2)
    return writeFile(path, jsonString)
}
