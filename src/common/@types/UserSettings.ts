import Joi from 'joi'

export const SUPPORTED_VERSION = '1.0'

export const schema = Joi.object<UserSettings>({
    version: Joi.string().valid('1.0').optional(),
    _7zExeFile: Joi.string().min(1).optional(),
    gameDir: Joi.string().min(1).optional(),
})

export default interface UserSettings {
    version?: string
    _7zExeFile: string | null
    gameDir: string | null
}
