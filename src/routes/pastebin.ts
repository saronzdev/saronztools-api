import { Router } from 'express'
import { createPaste, getPasteBySlug } from '../database/pastebin'
import { PasteIn, PasteOut } from '../types'
import { nano } from '../services/constants'
import { validatePaste } from '../services/validations'
import { incrementPasteViews } from '../database/pastebin'

export const pasteRouter = Router()

// pasteRouter.get('/', (req, res) => {})

pasteRouter.get('/:slug', async (req, res) => {
  const { slug } = req.params
  const data = await getPasteBySlug(slug)
  if (!data) return res.sendStatus(404)
  res.json(data)
})

pasteRouter.post('/', async (req, res) => {
  const data: PasteIn = req.body
  if (!data && validatePaste(data)) return res.status(400).json({ message: 'Some fields missing' })
  const result = await createPaste(data)
  if (!result) return res.sendStatus(500)
  res.status(201).json({ slug: result })
})

pasteRouter.patch('/:slug', async (req, res) => {
  const { slug } = req.params
  const result = await incrementPasteViews(slug)
  if (!result) return res.sendStatus(500)
  res.sendStatus(200)
})
