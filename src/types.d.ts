export type PasteIn = {
  slug: string
  body: string
  author: string | null
  exp: string
}
type Paste = {
  views: number
  createdAt: number
}

export type PasteOut = PasteIn & Paste
