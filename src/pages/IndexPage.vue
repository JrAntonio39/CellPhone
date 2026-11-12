<template>
  <q-page class="catalog-page q-pa-md">
    <div class="catalog-shell rounded-borders q-pa-md column">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-3 gt-sm">
        <q-toggle v-model="soloNuevo" label="Nuevo" color="primary" />
        <q-card class="filter-card filter-card--green cuadro-negro q-mb-md">
          <q-card-section class="text-subtitle2">Marca</q-card-section>
          <q-card-section class="q-pt-none column">
            <q-checkbox dense v-model="marcas" val="Samsung" color="secondary" label="Samsung" />
            <q-checkbox dense v-model="marcas" val="Huawei" color="secondary" label="Huawei" />
            <q-checkbox dense v-model="marcas" val="Nokia" color="secondary" label="Nokia" />
            <q-checkbox dense v-model="marcas" val="Iphone" color="secondary" label="Iphone" />
            <q-checkbox dense v-model="marcas" val="Xiaomi" color="secondary" label="Xiaomi" />
          </q-card-section>
        </q-card>
        <q-card class="filter-card filter-card--olive cuadro-negro q-mb-md">
          <q-card-section class="text-subtitle2">Sistema</q-card-section>
          <q-card-section class="q-pt-none column">
            <q-checkbox dense v-model="sistemas" val="Android" color="secondary" label="Android" />
            <q-checkbox dense v-model="sistemas" val="Windows" color="secondary" label="Windows" />
            <q-checkbox dense v-model="sistemas" val="Ios" color="secondary" label="Ios" />
          </q-card-section>
        </q-card>
        <q-card class="filter-card filter-card--sage cuadro-negro">
          <q-card-section class="text-subtitle2">Pantalla</q-card-section>
          <q-card-section class="q-pt-none column">
            <q-checkbox dense v-model="pantallas" val="6.0" color="secondary" label="6.0" />
            <q-checkbox dense v-model="pantallas" val="5.5" color="secondary" label="5.5" />
            <q-checkbox dense v-model="pantallas" val="5" color="secondary" label="5" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-9">
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-auto gt-sm">
            <q-card class="filter-toolbar filter-toolbar--green cuadro-negro q-pa-sm row items-center q-gutter-sm" style="height: 100%">
              <span>Precio:</span>
              <q-input v-model="precioDesde" dense outlined bg-color="white" prefix="$" style="width:90px" type="number" />
              <span>Hasta:</span>
              <q-input v-model="precioHasta" dense outlined bg-color="white" prefix="$" style="width:90px" type="number" />
            </q-card>
          </div>
          <div class="col-auto gt-sm">
            <q-card class="filter-toolbar filter-toolbar--sage cuadro-negro q-pa-sm row items-center q-gutter-sm" style="height: 100%">
              <span>Ordenar por:</span>
              <q-select v-model="orden" :options="ordenes" emit-value map-options dense outlined bg-color="white" options-dense style="width: 110px" />
            </q-card>
          </div>
        </div>

        <div class="row items-center q-col-gutter-sm q-mb-md lt-md">
          <div class="col-auto"><span>Ordenar por:</span></div>
          <div class="col-auto">
            <q-select v-model="orden" :options="ordenes" emit-value map-options dense outlined bg-color="white" options-dense style="width: 110px" />
          </div>
          <div class="col-auto">
            <q-btn icon="filter_alt" outline color="dark" bg-color="white">
              <q-menu>
                <div class="q-pa-md scroll" style="width: 230px; max-height: 70vh">
                  <q-toggle v-model="soloNuevo" label="Nuevo" color="primary" class="q-mb-sm" />
                  <q-card class="filter-card filter-card--green cuadro-negro q-mb-sm">
                    <q-card-section class="text-subtitle2 q-pb-xs">Marca</q-card-section>
                    <q-card-section class="q-pt-none column">
                      <q-checkbox dense v-model="marcas" val="Samsung" color="secondary" label="Samsung" />
                      <q-checkbox dense v-model="marcas" val="Huawei" color="secondary" label="Huawei" />
                      <q-checkbox dense v-model="marcas" val="Nokia" color="secondary" label="Nokia" />
                      <q-checkbox dense v-model="marcas" val="Iphone" color="secondary" label="Iphone" />
                      <q-checkbox dense v-model="marcas" val="Xiaomi" color="secondary" label="Xiaomi" />
                    </q-card-section>
                  </q-card>
                  <q-card class="filter-card filter-card--olive cuadro-negro q-mb-sm">
                    <q-card-section class="text-subtitle2 q-pb-xs">Sistema</q-card-section>
                    <q-card-section class="q-pt-none column">
                      <q-checkbox dense v-model="sistemas" val="Android" color="secondary" label="Android" />
                      <q-checkbox dense v-model="sistemas" val="Windows" color="secondary" label="Windows" />
                      <q-checkbox dense v-model="sistemas" val="Ios" color="secondary" label="Ios" />
                    </q-card-section>
                  </q-card>
                  <q-card class="filter-card filter-card--sage cuadro-negro">
                    <q-card-section class="text-subtitle2 q-pb-xs">Pantalla</q-card-section>
                    <q-card-section class="q-pt-none column">
                      <q-checkbox dense v-model="pantallas" val="6.0" color="secondary" label="6.0" />
                      <q-checkbox dense v-model="pantallas" val="5.5" color="secondary" label="5.5" />
                      <q-checkbox dense v-model="pantallas" val="5" color="secondary" label="5" />
                    </q-card-section>
                  </q-card>
                </div>
              </q-menu>
            </q-btn>
          </div>
        </div>

        <div class="row q-col-gutter-md product-grid">
          <div v-for="anuncio in paginados" :key="anuncio.id" class="col-6 col-md-3">
            <q-card @click="$router.push('/detalle/' + anuncio.id)" class="cuadro-negro cursor-pointer column" style="height: 100%">
              <q-img :src="fotoUrl(anuncio)" ratio="1" fit="contain" class="bg-grey-2" />
              <q-card-section class="col">
                <div class="text-h6 text-primary">${{ anuncio.precio }}</div>
                <div class="text-caption titulo-card">{{ anuncio.titulo }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="row justify-center items-center pagination-row q-mt-xl q-pt-xl q-col-gutter-md">
          <div class="col-auto">
            <div class="row items-center no-wrap q-gutter-xs">
              <q-btn square outline color="dark" icon="chevron_left" :disable="pagina === 1" @click="pagina--" />
              <q-btn v-for="n in maxPaginas" :key="n" square :outline="pagina !== n" :color="pagina === n ? 'primary' : 'dark'" :label="String(n)" @click="pagina = n" />
              <q-btn square outline color="dark" icon="chevron_right" :disable="pagina === maxPaginas" @click="pagina++" />
            </div>
          </div>
          <div class="col-auto">
            <div class="row items-center no-wrap q-gutter-sm">
              <span>Articulos por pagina:</span>
              <q-select v-model="porPagina" :options="[4, 8, 12, 25]" dense outlined options-dense style="width: 80px" />
            </div>
          </div>
        </div>

        <div v-if="!filtrados.length" class="text-grey-7 text-center q-mt-lg">No se encontraron anuncios con esos filtros</div>
      </div>
    </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { db } from '@/boot/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { busqueda } from '@/composables/busqueda'

const anuncios = ref([])

const soloNuevo = ref(false)
const marcas = ref([])
const sistemas = ref([])
const pantallas = ref([])
const precioDesde = ref('')
const precioHasta = ref('')
const orden = ref('precio')
const ordenes = [
  { label: 'Precio', value: 'precio' },
  { label: 'Fecha', value: 'fecha' }
]

const igual = (a, b) => String(a || '').toLowerCase() === String(b || '').toLowerCase()

const fotoFija = 'https://cdn.smart-gsm.com/img/picture/big/xiaomi-redmi-12.jpg'
function fotoUrl (a) {
  const f = (a.fotoIds || [])[0]
  return f && String(f).includes('/') ? 'http://localhost:5984/fotos/' + f : fotoFija
}

const filtrados = computed(() => {
  let lista = anuncios.value
  if (busqueda.value) {
    const texto = busqueda.value.toLowerCase()
    lista = lista.filter(a => String(a.titulo || '').toLowerCase().includes(texto))
  }
  if (soloNuevo.value) lista = lista.filter(a => igual(a.estado, 'Nuevo'))
  if (marcas.value.length) lista = lista.filter(a => marcas.value.some(m => igual(m, a.marca)))
  if (sistemas.value.length) lista = lista.filter(a => sistemas.value.some(s => igual(s, a.sistema)))
  if (pantallas.value.length) lista = lista.filter(a => pantallas.value.some(p => parseFloat(p) === parseFloat(a.pantalla)))
  if (precioDesde.value !== '') lista = lista.filter(a => (Number(a.precio) || 0) >= Number(precioDesde.value))
  if (precioHasta.value !== '') lista = lista.filter(a => (Number(a.precio) || 0) <= Number(precioHasta.value))
  return lista.slice().sort((a, b) => {
    if (orden.value === 'precio') return (Number(a.precio) || 0) - (Number(b.precio) || 0)
    return ((b.fecha && b.fecha.seconds) || 0) - ((a.fecha && a.fecha.seconds) || 0)
  })
})

const pagina = ref(1)
const porPagina = ref(4)
const maxPaginas = computed(() => Math.max(1, Math.ceil(filtrados.value.length / porPagina.value)))
const paginados = computed(() => filtrados.value.slice((pagina.value - 1) * porPagina.value, pagina.value * porPagina.value))

watch(filtrados, () => { pagina.value = 1 })
watch(porPagina, () => { pagina.value = 1 })

onMounted(async () => {
  const snap = await getDocs(collection(db, 'anuncios'))
  anuncios.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
})
</script>

<style scoped>
.cuadro-negro {
  border: 1px solid #66736b;
  border-radius: 6px;
  box-shadow: 0 3px 10px rgba(20, 35, 26, 0.12);
}
.catalog-page {
  background: #fff;
}
.catalog-shell {
  width: 100%;
  max-width: 1600px;
  min-height: calc(100vh - 90px);
  margin: 0 auto;
  background: #fff;
  border: 1px solid #d8ded9;
}
.filter-card--green {
  background: linear-gradient(145deg, #b9e7c5, #75bd8a);
}
.filter-card--olive {
  background: linear-gradient(145deg, #d9e99a, #a8c65b);
}
.filter-card--sage {
  background: linear-gradient(145deg, #a8e3d2, #5eb99d);
}
.filter-toolbar--green {
  background: linear-gradient(145deg, #c8edcf, #95d3a4);
}
.filter-toolbar--sage {
  background: linear-gradient(145deg, #b9e8d9, #80cbb4);
}
.pagination-row {
  margin-top: 64px;
  padding-top: 24px;
}
.titulo-card {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
