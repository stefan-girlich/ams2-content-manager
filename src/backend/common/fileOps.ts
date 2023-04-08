import fs from 'fs'

const encoding = 'utf-8'

export const readFile = (filePath: string) => fs.promises.readFile(filePath, { encoding })
export const readJsonFile = async (filePath: string) => {
    const contentsString = await readFile(filePath)
    return JSON.parse(contentsString)
}
export const writeJsonFile = async (filePath: string, data: any) => {
    const contentsString = JSON.stringify(data)
    fs.promises.writeFile(filePath, contentsString)
}