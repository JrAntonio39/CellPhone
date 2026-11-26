import { api } from '@/boot/axios'

const couchApi = api
const couchConfig = {
  baseUrl: 'http://localhost:5984',
  database: 'fpi-imagenes'
}

export async function subirFotoCouchDB (file) {
  if (!file?.type?.startsWith('image/')) throw new Error('Solo puedes subir archivos de imagen.')
  if (file.size > 10 * 1024 * 1024) throw new Error('Cada imagen debe pesar 10 MB o menos.')

  const id = `foto-${crypto.randomUUID()}`
  const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_') || 'imagen'
  try {
    await couchApi.put(`/${encodeURIComponent(id)}/${encodeURIComponent(filename)}`, file, {
      headers: { 'Content-Type': file.type }
    })
  } catch (error) {
    if (error.response?.status === 401) throw new Error('CouchDB rechazó el usuario o la contraseña configurados.', { cause: error })
    if (error.response?.status === 404) throw new Error(`No existe la base CouchDB "${couchConfig.database}" en ${couchConfig.baseUrl}.`, { cause: error })
    if (error.code === 'ERR_NETWORK') throw new Error('No se pudo conectar con CouchDB. Comprueba que esté iniciado y permita conexiones desde la app.', { cause: error })
    throw new Error(error.response?.data?.reason || error.response?.data?.error || 'No se pudo guardar la foto en CouchDB.', { cause: error })
  }

  return { id, filename, url: `${couchConfig.baseUrl}/${encodeURIComponent(couchConfig.database)}/${encodeURIComponent(id)}/${encodeURIComponent(filename)}` }
}

export function urlAdjuntoCouchDB (reference) {
  if (!reference) return null
  if (typeof reference === 'string' && /^https?:\/\//i.test(reference)) return reference
  if (typeof reference === 'object' && reference.url) return reference.url
  if (typeof reference === 'object' && reference.id && reference.filename) {
    return `${couchConfig.baseUrl}/${encodeURIComponent(couchConfig.database)}/${encodeURIComponent(reference.id)}/${encodeURIComponent(reference.filename)}`
  }
  return null
}

export async function cargarFotoCouchDB (reference) {
  if (typeof reference !== 'object' || !reference?.id || !reference?.filename) return null
  const response = await couchApi.get(
    `/${encodeURIComponent(reference.id)}/${encodeURIComponent(reference.filename)}`,
    { responseType: 'blob' }
  )
  return URL.createObjectURL(response.data)
}
