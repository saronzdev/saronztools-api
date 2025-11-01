import { PasteIn } from '../types'
import { exps } from './constants'

export function validatePaste(data: PasteIn) {
  return (typeof data.author === 'string' || !data.author) && typeof data.body === 'string' && exps.includes(data.exp)
}
