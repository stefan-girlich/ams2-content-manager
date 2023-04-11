import Joi from 'joi'

export const SUPPORTED_VERSION = '1.0'

export const schema = Joi.object<UserSettings>({
    version: Joi.string().valid('1.0').optional(),
    _7zExeFile: Joi.string().min(1).required(),
    gameDir: Joi.string().min(1).required(),
})

export default interface UserSettings {
    version?: string
    _7zExeFile: string
    gameDir: string
}
