import { customAlphabet } from 'nanoid'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
export const nano = customAlphabet(alphabet, 8)

export const exps = ['1h', '1d', '7d']
