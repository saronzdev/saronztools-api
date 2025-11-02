import { turso } from '../services/constants'

const pasteQuery = `
  CREATE TABLE IF NOT EXISTS pastes (
    slug TEXT PRIMARY KEY NOT NULL,
    author TEXT,
    body TEXT NOT NULL,
    exp TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    createdAt INTEGER DEFAULT (CAST(unixepoch() * 1000 AS INTEGER))
  )
`
export async function initPastesTable() {
  try {
    await turso.execute(pasteQuery)
    console.log('Pastes table initialized successfully')
  } catch (error) {
    throw new Error('Failed to initialize pastes table')
  }
}
