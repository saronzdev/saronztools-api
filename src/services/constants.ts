import { customAlphabet } from 'nanoid'
import path from 'node:path'
import { createClient, Config } from '@libsql/client'

export const fileDbJson = path.join(process.cwd(), 'db.json')
export const htmlPath = path.join(process.cwd(), 'client', 'index.html')

const tursoUrl = process.env.TURSO_URL || ''
const tursoToken = process.env.TURSO_TOKEN || ''
export const isProd = process.env.NODE_ENV === 'production'

const tursoOptions: Config = isProd ? { url: tursoUrl, authToken: tursoToken } : { url: 'file:./local.db' }
export const turso = createClient(tursoOptions)

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
export const nano = customAlphabet(alphabet, 8)

export const exps = ['1h', '1d', '7d']
