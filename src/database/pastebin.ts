import { nano, turso } from '../services/constants'
import { PasteIn, PasteOut } from '../types'

export async function createPaste(paste: PasteIn): Promise<string | false> {
  const { slug, author, body, exp } = paste
  const query = `
    INSERT INTO pastes (slug, author, body, exp)
    VALUES (?, ?, ?, ?)
  `
  try {
    let slug = nano()
    while (await getSlugExists(slug)) {
      slug = nano()
    }
    await turso.execute(query, [slug, author, body, exp])
    return slug
  } catch (error) {
    console.error('Error creating paste:', error)
    return false
  }
}

async function getSlugExists(slug: string): Promise<boolean> {
  const query = `
    SELECT 1 FROM pastes WHERE slug = ?
  `
  try {
    const result = await turso.execute(query, [slug])
    return result.rows.length > 0
  } catch (error) {
    console.error('Error checking slug existence:', error)
    return false
  }
}

export async function getPasteBySlug(slug: string): Promise<PasteOut | false> {
  const query = `
    SELECT * FROM pastes WHERE slug = ?
  `
  try {
    const result = await turso.execute(query, [slug])
    if (result.rows.length === 0) return false
    const row = result.rows[0] as unknown as PasteOut
    return row
  } catch (error) {
    console.error('Error fetching paste by slug:', error)
    return false
  }
}

export async function incrementPasteViews(slug: string): Promise<boolean> {
  const query = `
    UPDATE pastes
    SET views = views + 1
    WHERE slug = ?
  `
  try {
    await turso.execute(query, [slug])
    return true
  } catch (error) {
    console.error('Error incrementing paste views:', error)
    return false
  }
}
