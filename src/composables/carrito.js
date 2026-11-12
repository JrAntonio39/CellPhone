import { ref } from 'vue'

export const carrito = ref([])

export function agregarAlCarrito (anuncio) {
  if (!carrito.value.some((a) => a.id === anuncio.id)) {
    carrito.value.push(anuncio)
  }
}

export function quitarDelCarrito (id) {
  carrito.value = carrito.value.filter((a) => a.id !== id)
}
