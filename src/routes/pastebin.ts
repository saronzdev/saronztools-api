import { Router } from 'express'
import { read_json, write_json } from '../database/json'
import { PasteIn, PasteOut } from '../types'
import { nano } from '../services/constants'
import { validatePaste } from '../services/validations'

export const pbRouter = Router()

pbRouter.get('/', (req, res) => {
  const data = read_json()
  if (data.length === 0) return res.sendStatus(404)
  res.json(data)
})

pbRouter.get('/:slug', (req, res) => {
  const { slug } = req.params
  const data = read_json()
  const match = data.filter((i) => i.slug === slug)
  if (match.length === 0) return res.sendStatus(404)
  res.json(match)
})

pbRouter.post('/', (req, res) => {
  const data: PasteIn = req.body
  if (!data && validatePaste(data)) res.status(400).json({ message: 'Some fileds missing' })
  const newData: PasteOut = { ...data, slug: nano(), createdAt: Date.now() }
  write_json(newData)
  res.sendStatus(201)
})
