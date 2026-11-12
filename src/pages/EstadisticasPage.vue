<template>
  <q-page class="q-pa-md">
    <div class="bg-green-2 rounded-borders q-pa-md" style="max-width: 1100px; margin: 0 auto">
      <div class="text-h5 text-center text-italic text-weight-bold q-mb-md">Estadisticas</div>

      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-card class="cuadro-negro q-pa-md" style="height: 100%">
            <div class="text-subtitle1 text-weight-bold q-mb-md">Telefonos disponibles por marca</div>
            <div v-for="[marca, total] in porMarca" :key="marca" class="row items-center q-mb-sm">
              <div class="text-weight-bold" style="width: 80px">{{ marca }}</div>
              <div class="col">
                <div class="barra-h" :style="{ width: (total / maxMarca * 100) + '%' }"></div>
              </div>
              <span class="q-ml-sm text-weight-bold">{{ total }}</span>
            </div>
            <div v-if="!anuncios.length" class="text-grey-7">No hay anuncios registrados</div>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card class="cuadro-negro q-pa-md" style="height: 100%">
            <div class="text-subtitle1 text-weight-bold q-mb-md">Dispositivos por tamaño de pantalla</div>
            <div class="eje-v row items-end justify-center q-gutter-md q-pa-sm" style="height: 230px">
              <div v-for="[pantalla, total] in porPantalla" :key="pantalla" class="column items-center">
                <span class="text-weight-bold">{{ total }}</span>
                <div class="barra-v" :style="{ height: Math.max(10, total / maxPantalla * 140) + 'px' }"></div>
                <span class="text-caption">{{ pantalla }}"</span>
              </div>
            </div>
            <div v-if="!anuncios.length" class="text-grey-7">No hay anuncios registrados</div>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card class="cuadro-negro q-pa-md" style="height: 100%">
            <div class="text-subtitle1 text-weight-bold q-mb-md">Margen de ventas: nuevos vs usados</div>
            <svg viewBox="0 0 300 150" class="full-width" style="height: 190px">
              <polyline points="0,120 60,90 120,45 180,70 240,20 300,40" fill="none" stroke="#2e7d32" stroke-width="4" />
              <polyline points="0,140 50,65 130,55 180,85 250,25 300,10" fill="none" stroke="#bdbdbd" stroke-width="3" />
            </svg>
            <div class="row justify-center q-gutter-lg">
              <div class="row items-center q-gutter-xs"><div class="muestra bg-primary"></div><span>Nuevos</span></div>
              <div class="row items-center q-gutter-xs"><div class="muestra bg-grey-5"></div><span>Usados</span></div>
            </div>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card class="cuadro-negro q-pa-md text-center" style="height: 100%">
            <div class="text-subtitle1 text-weight-bold q-mb-md">Anuncios registrados: nuevos vs usados</div>
            <svg viewBox="0 0 100 100" class="grafica-circular">
              <circle cx="50" cy="50" r="48" :fill="pctNuevo >= 100 ? '#2e7d32' : '#bdbdbd'" />
              <path v-if="sector" :d="sector" fill="#2e7d32" />
              <circle cx="50" cy="50" r="48" fill="none" stroke="black" stroke-width="4" />
            </svg>
            <div class="row justify-center q-gutter-lg q-mt-sm">
              <div class="row items-center q-gutter-xs"><div class="muestra bg-primary"></div><span>Nuevo {{ pctNuevo }}%</span></div>
              <div class="row items-center q-gutter-xs"><div class="muestra bg-grey-5"></div><span>Usado {{ 100 - pctNuevo }}%</span></div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { db } from '@/boot/firebase'
import { collection, getDocs } from 'firebase/firestore'

const anuncios = ref([])

function contar (campo) {
  const r = {}
  anuncios.value.forEach((a) => {
    if (a[campo]) r[a[campo]] = (r[a[campo]] || 0) + 1
  })
  return Object.entries(r).sort((a, b) => b[1] - a[1])
}

const porMarca = computed(() => contar('marca'))
const porPantalla = computed(() => {
  return contar('pantalla').sort((a, b) => (parseFloat(a[0]) || 0) - (parseFloat(b[0]) || 0))
})
const maxMarca = computed(() => Math.max(1, ...porMarca.value.map((e) => e[1])))
const maxPantalla = computed(() => Math.max(1, ...porPantalla.value.map((e) => e[1])))

const pctNuevo = computed(() => {
  const n = anuncios.value.filter((a) => a.estado === 'Nuevo').length
  return Math.round((n / Math.max(1, anuncios.value.length)) * 100)
})

const sector = computed(() => {
  const p = Math.min(100, Math.max(0, pctNuevo.value))
  if (p <= 0 || p >= 100) return null
  const r = 48
  const rad = (grados) => (grados * Math.PI) / 180
  const x0 = (50 + r * Math.cos(rad(-90))).toFixed(2)
  const y0 = (50 + r * Math.sin(rad(-90))).toFixed(2)
  const x1 = (50 + r * Math.cos(rad(-90 + p * 3.6))).toFixed(2)
  const y1 = (50 + r * Math.sin(rad(-90 + p * 3.6))).toFixed(2)
  const grande = p > 50 ? 1 : 0
  return `M 50 50 L ${x0} ${y0} A ${r} ${r} 0 ${grande} 1 ${x1} ${y1} Z`
})

onMounted(async () => {
  const snap = await getDocs(collection(db, 'anuncios'))
  anuncios.value = snap.docs.map((d) => d.data())
})
</script>

<style scoped>
.cuadro-negro {
  border: 2px solid black;
}
.barra-h {
  height: 22px;
  min-width: 16px;
  background: #4caf50;
  border: 2px solid black;
  border-radius: 3px;
}
.eje-v {
  border-left: 2px solid black;
  border-bottom: 2px solid black;
}
.barra-v {
  width: 40px;
  background: #4caf50;
  border: 2px solid black;
  border-radius: 4px 4px 0 0;
}
.grafica-circular {
  width: 180px;
  height: 180px;
  display: block;
  margin: auto;
}
.muestra {
  width: 18px;
  height: 18px;
  border: 2px solid black;
}
</style>
