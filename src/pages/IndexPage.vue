<template>
  <q-page class="catalog-page q-pa-md">
    <div class="catalog-shell rounded-borders q-pa-md column">
    <div class="row q-col-gutter-md catalog-layout-row">
      <div class="col-12 col-md-3 gt-sm filter-sidebar">
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

      <div class="col-12 col-md-9 catalog-content">
        <div class="row q-col-gutter-md q-mb-md justify-center">
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
                  <q-card class="filter-toolbar filter-toolbar--green cuadro-negro q-pa-sm q-mb-sm">
                    <div class="text-subtitle2 q-mb-xs">Rango de precio</div>
                    <div class="row q-col-gutter-sm">
                      <div class="col-6">
                        <q-input v-model="precioDesde" dense outlined bg-color="white" prefix="$" label="Desde" type="number" />
                      </div>
                      <div class="col-6">
                        <q-input v-model="precioHasta" dense outlined bg-color="white" prefix="$" label="Hasta" type="number" />
                      </div>
                    </div>
                  </q-card>
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

        <div class="product-grid">
          <div v-for="anuncio in paginados" :key="anuncio.id" class="product-item">
            <q-card @click="$router.push('/detalle/' + anuncio.id)" class="cuadro-negro product-card cursor-pointer column">
            <div class="product-photo-frame">
              <q-img :src="fotoUrl(anuncio)" fit="contain" class="product-image" />
            </div>
              <q-card-section class="col product-info">
                <div class="product-title titulo-card">{{ anuncio.titulo }}</div>
                <div class="product-price">${{ anuncio.precio }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="pagination-section">
        <div class="row justify-center items-center pagination-row q-col-gutter-md">
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
  background: transparent;
}
.catalog-shell {
  --catalog-card-green: #c8dfca;
  width: 100%;
  max-width: 1600px;
  min-height: calc(100vh - 90px);
  margin: 0 auto;
  background: rgba(195, 233, 211, 0.035);
  border: 1px solid rgba(211, 245, 225, 0.24);
  box-shadow: 0 10px 28px rgba(0, 25, 31, 0.2), inset 0 1px rgba(255, 255, 255, 0.24);
  backdrop-filter: blur(1px);
}
.catalog-content {
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.catalog-layout-row {
  flex: 1 1 auto;
}
.filter-card--green {
  background: var(--catalog-card-green);
}
.filter-card--olive,
.filter-card--sage {
  background: var(--catalog-card-green);
}
.filter-toolbar--green {
  background: rgba(220, 241, 225, 0.42);
  color: #17352a;
}
.filter-toolbar--sage {
  background: rgba(220, 241, 225, 0.42);
  color: #17352a;
}
.filter-sidebar {
  position: sticky;
  top: 64px;
  align-self: flex-start;
  height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  scrollbar-width: thin;
  padding: 12px;
  border-radius: 8px 8px 0 0;
  background: rgba(5, 78, 70, 0.055);
  border: 1px solid rgba(224, 255, 239, 0.2);
  box-shadow: 0 8px 22px rgba(0, 30, 30, 0.18), inset 0 1px rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(1px);
}
.filter-sidebar .filter-card {
  background: rgba(220, 241, 225, 0.46);
  border-color: rgba(230, 255, 238, 0.65);
  box-shadow: 0 5px 14px rgba(0, 34, 29, 0.15);
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 20px;
  align-items: stretch;
}
.product-item {
  min-width: 0;
  display: flex;
}
.product-card {
  background: rgba(232, 246, 236, 0.46);
  color: #17251d;
  overflow: hidden;
  border: 1px solid rgba(220, 246, 226, 0.75);
  border-radius: 10px;
  box-shadow: 0 7px 20px rgba(0, 35, 30, 0.2), inset 0 1px rgba(255, 255, 255, 0.65);
  transition: transform 160ms ease, box-shadow 160ms ease;
  width: 100%;
  height: 360px;
}
.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 45, 34, 0.2);
}
.product-card .text-primary {
  color: #003e32 !important;
}
.product-image {
  background: rgba(255, 255, 255, 0.92);
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 168px;
}
.product-photo-frame {
  flex: 0 0 188px;
  height: 188px;
  margin: 8px 8px 0;
  padding: 6px;
  border: 1px solid #bfd6c5;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.92);
}
.product-info {
  background: transparent;
  color: #17251d;
  border-radius: 0 0 9px 9px;
}
.product-title {
  min-height: 42px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d4e2d7;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  overflow-wrap: anywhere;
}
.product-price {
  margin-top: 8px;
  color: #003e32;
  font-size: 20px;
  font-weight: 700;
}
.pagination-row {
  margin: 0;
  padding: 0 0 20px;
}
.pagination-section {
  display: flex;
  flex: 1 0 260px;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 260px;
}
.titulo-card {
  display: block;
}
@media (max-width: 599px) {
  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
  .product-card {
    height: 380px;
  }
  .product-photo-frame {
    flex-basis: 150px;
    height: 150px;
  }
  .product-image {
    height: 130px;
  }
}
</style>
