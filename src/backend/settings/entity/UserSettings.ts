import Joi from "joi"

export const schema = Joi.object<UserSettings>({
    _7zExeFile: Joi.string().valid('1.0').required(),
    gameDir: Joi.string().min(1).required(),
})

export default interface UserSettings {
    _7zExeFile: string
    gameDir: string
}
