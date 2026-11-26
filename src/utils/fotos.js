import { urlAdjuntoCouchDB } from '@/services/couchdb'

export function urlFoto (referencia) {
  if (!referencia) return null
  if (typeof referencia === 'string' && /^https?:\/\//i.test(referencia)) return referencia
  const current = urlAdjuntoCouchDB(referencia)
  if (current) return current
  if (typeof referencia === 'string' && referencia.includes('/')) {
    return `https://couchdbbackend.esaapp.com/fotos/${referencia.split('/').map(encodeURIComponent).join('/')}`
  }
  return null
}

export function urlsFotosAnuncio (anuncio) {
  return (anuncio?.fotoIds || anuncio?.fotos || []).map(urlFoto).filter(Boolean)
}
