<template>
  <q-page class="q-pa-md q-pb-xl">
    <div class="page-panel detail-panel rounded-borders q-pa-md">
      <div class="row q-col-gutter-xl">
        <div class="col-12 col-md-6">
          <q-carousel
            v-model="slide"
            arrows
            navigation
            animated
            infinite
            height="350px"
            class="bg-grey-2 rounded-borders" >
            <q-carousel-slide v-for="(f,i) in fotos" :key="i" :name="i" class="phone-photo-slide">
              <q-img :src="f" fit="contain" class="phone-photo" />
            </q-carousel-slide>
          </q-carousel>
        </div>

        <div class="col-12 col-md-6">
          <div class="text-subtitle1 text-weight-bold">{{ anuncio.titulo }}</div>
          <div class="text-h3 text-primary text-weight-bold q-my-md">$ {{ anuncio.precio }}</div>
          <q-btn label="Comprar" icon="shopping_cart" color="primary" size="lg" class="q-px-xl q-mb-md gt-sm" @click="comprar" />
          <q-card class="cuadro-negro q-pa-md row justify-between">
            <span>Vendedor: {{ anuncio.vendedor }}</span>
            <span>Telefono: {{ anuncio.telefono }}</span>
          </q-card>
        </div>
      </div>

      <div class="text-h5 text-center text-weight-bold q-my-lg">Descripcion</div>
      <div class="row q-col-gutter-md">
          <q-card class="cuadro-negro col-12 col-md-5 q-pa-md">
            <div>Estado: {{ anuncio.estado }}</div>
            <div>Marca: {{ anuncio.marca }}</div>
            <div>Modelo: {{ anuncio.modelo }}</div>
            <div>Pantalla: {{ anuncio.pantalla }} pulgadas</div>
            <div>Sistema: {{ anuncio.sistema }}</div>
            <div>Rom: {{ anuncio.rom }}</div>
            <div>Ram: {{ anuncio.ram }}</div>
          </q-card>
          <q-card class="cuadro-negro col-12 col-md-7 q-pa-md">
            {{ anuncio.descripcion }}
          </q-card>
        </div>
      </div>

    <div class="fixed-bottom lt-md bg-white q-pa-sm" style="z-index: 1">
      <div class="row q-col-gutter-sm">
        <div class="col">
          <q-btn class="full-width cuadro-negro" label="Inicio" size="lg" color="white" text-color="black" to="/" />
        </div>
        <div class="col">
          <q-btn class="full-width cuadro-negro" label="Comprar" size="lg" color="white" text-color="black" @click="comprar" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { db } from '@/boot/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { agregarAlCarrito } from '@/composables/carrito'
import { urlsFotosAnuncio } from '@/utils/fotos'
import { cargarFotoCouchDB } from '@/services/couchdb'

const route = useRoute()
const $q = useQuasar()
const anuncio = ref({})
const slide = ref(0)
const fotoFija = 'https://cdn.smart-gsm.com/img/picture/big/xiaomi-redmi-12.jpg'
const fotos = ref([fotoFija])

function comprar () {
  agregarAlCarrito({ id: route.params.id, ...anuncio.value })
  $q.notify({ type: 'positive', message: 'Agregado al carrito', timeout: 2000 })
}

onMounted(async () => {
  const snap = await getDoc(doc(db, 'anuncios', route.params.id))
  if(snap.exists()) {
    anuncio.value = snap.data()
    const referencias = anuncio.value.fotoIds || anuncio.value.fotos || []
    const urls = await Promise.all(referencias.map(async (referencia) => {
      try {
        return await cargarFotoCouchDB(referencia) || urlsFotosAnuncio({ fotoIds: [referencia] })[0]
      } catch (error) {
        console.error('No se pudo cargar la foto del anuncio:', error)
        return null
      }
    }))
    const urlsValidas = urls.filter(Boolean)
    if (urlsValidas.length) fotos.value = urlsValidas
  }
})


</script>

<style scoped>
.cuadro-negro {
  border: 2px solid black;
}
.phone-photo-slide {
  padding: 0;
  background: #fff;
}
.phone-photo {
  width: 100%;
  height: 100%;
}
.detail-panel {
  width: 100%;
  min-height: calc(100vh - 90px);
}
</style>
