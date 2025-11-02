import { app } from '../src/index'
export default async function handler(req: any, res: any) {
  try {
    return app(req, res)
  } catch (err) {
    // Captura de errores sincronizados en el handler
    console.error('Error en handler de Vercel:', {
      method: req?.method,
      url: req?.url,
      message: (err as any)?.message,
      stack: (err as any)?.stack
    })
    res.statusCode = 500
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({ error: 'Internal Server Error' }))
  }
}
