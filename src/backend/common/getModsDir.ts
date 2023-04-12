import joinPaths from '../util/joinPaths'

const getModsDir = (gameDir: string) => joinPaths(gameDir, 'MODS')

export default getModsDir
