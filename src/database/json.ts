import fs from 'node:fs'
import path from 'node:path'
import { PasteIn, PasteOut } from '../types'

const filePath = path.join(process.cwd(), 'db.json')

export function read_json(): PasteOut[] {
  try {
    if (!fs.existsSync(filePath)) {
      return []
    }
    const raw = fs.readFileSync(filePath, 'utf-8')
    return raw ? JSON.parse(raw) : []
  } catch (error) {
    console.error('Error reading JSON:', error)
    return []
  }
}

export function write_json(paste: PasteOut) {
  try {
    const data = read_json()
    data.push(paste)
    const save = JSON.stringify(data, null, 2)
    fs.writeFileSync(filePath, save)
  } catch (error) {
    console.error('Error writing JSON:', error)
  }
}
