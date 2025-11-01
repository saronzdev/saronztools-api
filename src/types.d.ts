export type PasteIn = {
  body: string
  author: string | null
  exp: string
}
type Paste = {
  slug: string
  // authorId: number | null
  createdAt: number
}

export type PasteOut = PasteIn & Paste
