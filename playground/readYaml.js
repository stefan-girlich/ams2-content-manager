const fs = require('fs')
const yaml = require('yaml')

const candidate = 'userdata/MODS/VRC_-_AMS2_-_ARC_-_Auriel_90_GTO_-_V1.1/manifest.yml'

const main = async () => {
    const manifestContentRaw = await fs.promises.readFile(candidate, { encoding: 'utf-8' })
    const manifestContent = yaml.parse(manifestContentRaw)
    console.log('🚀 ~ file: readYaml.js:9 ~ main ~ manifestContent:', manifestContent)
}

main()
