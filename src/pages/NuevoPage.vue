<template>
  <q-page class="q-pa-md q-pb-xl">
    <div class="row q-col-gutter-md">
    <div class="col-12 col-md-8">
    <div class="page-panel rounded-borders q-pa-md">
    <div class="text-h5 text-center text-italic text-weight-bold q-mb-md gt-sm">Nuevo Anuncio</div>

    <div class="lt-md">
      <q-carousel
        v-model="fotoSlide"
        animated
        arrows
        infinite
        navigation
        height="190px"
        control-color="dark"
        class="bg-grey-2 cuadro-negro q-mb-sm"
      >
        <q-carousel-slide :name="0" class="column items-center justify-center">
          <q-card class="cuadro-negro column items-center justify-center cursor-pointer" style="width: 150px; height: 150px" @click="inputFotoMovil.pickFiles()">
            <q-icon name="add_circle" size="48px" />
            <div class="q-mt-sm">Agregar Foto</div>
          </q-card>
        </q-carousel-slide>
        <q-carousel-slide v-for="(f, i) in fotos" :key="i" :name="i + 1" :img-src="fotosUrls[i]" fit="contain" />
      </q-carousel>
      <q-file ref="inputFotoMovil" v-model="nuevaFoto" class="hidden" @update:model-value="agregarFoto" />

      <div class="row justify-center items-center q-gutter-sm q-mb-md">
        <q-btn round color="primary" icon="remove" @click="quitarFoto" />
        <span v-if="fotos.length" class="text-caption">Fotos agregadas: {{ fotos.length }}</span>
      </div>

      <q-card class="cuadro-negro q-pa-sm q-mb-md">
        <div class="text-caption text-grey-8">Titulo:</div>
        <q-input v-model="form.titulo" dense hide-bottom-space input-class="text-weight-bold" />
      </q-card>

      <div class="row items-center justify-center q-mb-md">
        <span class="q-mr-sm">Precio:</span>
        <q-input v-model="form.precio" type="number" prefix="$" borderless dense hide-bottom-space input-class="text-h5 text-weight-bold" style="width: 150px" />
      </div>

      <div class="row q-col-gutter-sm q-mb-md">
        <div class="col-6">
          <div class="text-caption">Vendedor:</div>
          <q-input v-model="form.vendedor" dense hide-bottom-space />
        </div>
        <div class="col-6">
          <div class="text-caption">Telefono:</div>
          <q-input v-model="form.telefono" dense hide-bottom-space mask="####-####" />
        </div>
      </div>

      <q-card class="cuadro-negro q-pa-md q-mb-md column q-gutter-sm">
        <div class="row items-center">
          <span class="campo-movil">Estado:</span>
          <q-radio dense v-model="form.estado" val="Nuevo" label="Nuevo" color="primary" />
          <q-radio dense v-model="form.estado" val="Usado" label="Usado" color="primary" class="q-ml-sm" />
        </div>
        <div class="row items-center">
          <span class="campo-movil">Marca:</span>
          <q-select v-model="form.marca" dense hide-bottom-space options-dense class="col" :options="['Samsung', 'Huawei', 'Nokia', 'Iphone', 'Xiaomi', 'Zte', 'Motorola', 'Honor', 'Infinix', 'Tecno', 'Oppo']" />
        </div>
        <div class="row items-center">
          <span class="campo-movil">Modelo:</span>
          <q-input v-model="form.modelo" dense hide-bottom-space class="col" />
        </div>
        <div class="row items-center">
          <span class="campo-movil">Pantalla:</span>
          <q-input v-model="form.pantalla" dense hide-bottom-space type="number" step="0.1" placeholder="5.5" class="col" />
        </div>
        <div class="row items-center">
          <span class="campo-movil">Sistema:</span>
          <q-select v-model="form.sistema" dense hide-bottom-space options-dense class="col" :options="['Android', 'Windows', 'Ios']" />
        </div>
        <div class="row items-center">
          <span class="campo-movil">Rom:</span>
          <q-input v-model="form.rom" dense hide-bottom-space type="number" suffix="GB" class="col" />
        </div>
        <div class="row items-center">
          <span class="campo-movil">Ram:</span>
          <q-input v-model="form.ram" dense hide-bottom-space type="number" suffix="GB" class="col" />
        </div>
      </q-card>

      <q-card class="cuadro-negro q-pa-sm q-mb-md">
        <q-input v-model="form.descripcion" type="textarea" autogrow dense hide-bottom-space maxlength="50" counter />
      </q-card>
    </div>

    <div class=" row q-col-gutter-lg gt-sm">
      <div class="col-12 col-md-6">
        <q-card class="cuadro-negro q-pa-md">
          <div class="row items-center q-gutter-md q-mb-sm">
            <span class="campo">Estado:</span>
            <q-radio v-model="form.estado" val="Nuevo" label="Nuevo" color="primary" />
            <q-radio v-model="form.estado" val="Usado" label="Usado" color="primary" />
          </div>

          <div class="row items-center q-mb-sm">
            <span class="campo">Marca:</span>
            <q-select v-model="form.marca" dense outlined options-dense style="width:160px" :options="['Samsung', 'Huawei', 'Nokia', 'Iphone', 'Xiaomi', 'Zte', 'Motorola', 'Honor', 'Infinix', 'Tecno', 'Oppo']" />
          </div>
          <div class="row items-center q-mb-sm">
            <span class="campo">Modelo:</span>
            <q-input v-model="form.modelo" dense outlined placeholder="6 plus" />
          </div>
          <div class="row items-center q-mb-sm">
            <span class="campo">Pantalla:</span>
            <q-input v-model="form.pantalla" dense outlined type="number" step="0.1" placeholder="5.5" style="width:100px" />
          </div>
          <div class="row items-center q-mb-sm">
            <span class="campo">Sistema:</span>
            <q-select v-model="form.sistema" dense outlined options-dense style="width:150px" :options="['Android', 'Windows', 'Ios']" />
          </div>
          <div class="row items-center q-mb-sm">
            <span class="campo">ROM:</span>
            <q-input v-model="form.rom" dense outlined type="number" placeholder="64" suffix="GB" style="width:110px" />
            <span class="q-ml-sm">Almacenamiento interno</span>
          </div>
          <div class="row items-center">
            <span class="campo">RAM:</span>
            <q-input v-model="form.ram" dense outlined type="number" placeholder="2" suffix="GB" style="width:110px" />
          </div>
        </q-card>
        <q-card class="cuadro-negro q-pa-md q-mt-md">
          <div class="text-subtitle2 q-mb-md">Imagenes</div>
          <div class="row items-center q-gutter-md">
            <div class="column q-gutter-sm">
             <q-file ref="inputFoto" v-model="nuevaFoto" class="hidden" @update:model-value="agregarFoto" />
              <q-btn round color="primary" icon="add" @click="inputFoto.pickFiles()" />
              <q-btn round color="primary" icon="remove" @click="quitarFoto" />
            </div>

            <q-markup-table flat bordered dense style="width:170px">
              <thead>
                  <tr>
                  <th>N</th>
                  <th>Tamaño</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(f, i) in fotos" :key="i">
                  <td>{{ i + 1 }}</td>
                  <td>{{ tamanoKB(f) }}</td>
                  <td>{{ tipoFoto(f) }}</td>
                </tr>
              </tbody>
            </q-markup-table>

            <div class="col caja-preview">
              <img v-if="preview" :src="preview" style="width:100%; height:100%; object-fit: contain" />
              <q-icon v-else name="image" size="80px" color="grey-5" />
            </div>
          </div>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <div class=" text-h6 text-weight-bold q-mb-xs">Titulo breve del anuncio</div>
        <q-input v-model="form.titulo" dense outlined class="q-mb-md" />

        <div class="row items-center q-mb-sm">
          <span class="campo-right">Vendedor:</span>
          <q-input v-model="form.vendedor" outlined dense class="col" />
        </div>
        <div class="row items-center q-mb-md">
          <span class="campo-right">Telefono</span>
          <q-input v-model="form.telefono" outlined dense mask="####-####" class="col" />
        </div>

        <div class="text-weight-bold q-mb-xs">DESCRIPCION</div>
        <q-input v-model="form.descripcion" type="textarea" rows="3" maxlength="50" counter outlined class="q-mb-md" />

        <q-card bordered class="q-pa-md text-center relative-position q-mb-md" style="max-width: 280px; margin: 0 auto">
          <div class="etiqueta-precio text-weight-bold q-px-sm">PRECIO</div>
          <q-input v-model="form.precio" type="number" prefix="$" outlined dense />
        </q-card>

        <div class="row justify-center q-gutter-md q-mt-lg gt-sm">
          <q-btn label="Cancelar" icon="cancel" color="white" text-color="black" unelevated bordered to="/" />
          <q-btn label="Crear" icon="save" color="primary" unelevated @click="crear" />
        </div>
      </div>

    </div>
    </div>
    </div>

    <div class="col-12 col-md-4">
      <div class="page-panel rounded-borders q-pa-md" style="height: 100%">
        <div class="text-subtitle1 text-weight-bold q-mb-md">Anuncios guardados</div>
        <div v-if="!guardados.length" class="text-grey-7">No hay anuncios en la base de datos</div>
        <q-list v-else separator>
          <q-item v-for="a in guardados" :key="a.id">
            <q-item-section>
              <q-item-label class="text-weight-bold">{{ a.titulo }}</q-item-label>
              <q-item-label caption>${{ a.precio || 0 }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn round dense color="negative" icon="delete" @click="eliminar(a)" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    </div>

    <div class="fixed-bottom lt-md bg-white q-pa-sm" style="z-index: 1">
      <div class="row q-col-gutter-sm">
        <div class="col">
          <q-btn class="full-width cuadro-negro" label="Cancelar" size="lg" color="white" text-color="black" to="/" />
        </div>
        <div class="col">
          <q-btn class="full-width cuadro-negro" label="Crear Anuncio" size="lg" color="white" text-color="black" @click="crear" />
        </div>
      </div>
    </div>
  </q-page>

</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { db } from '@/boot/firebase'
import { api } from '@/boot/axios'
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'

const router = useRouter()
const $q = useQuasar()
const inputFoto =ref(null)
const inputFotoMovil = ref(null)
const form = reactive({
  estado: 'Nuevo',
  marca: '',
  modelo: '',
  pantalla: '',
  sistema: '',
  rom: '',
  ram: '',
  titulo: '',
  vendedor: '',
  telefono: '',
  descripcion: '',
  precio: ''
})

const fotos = ref([])
const nuevaFoto = ref(null)
const fotoSlide = ref(0)
const guardados = ref([])
const fotosUrls = computed(() => fotos.value.map((f) => URL.createObjectURL(f)))

async function cargarGuardados () {
  const snap = await getDocs(collection(db, 'anuncios'))
  guardados.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

async function eliminar (a) {
  await deleteDoc(doc(db, 'anuncios', a.id))
  guardados.value = guardados.value.filter((x) => x.id !== a.id)
  $q.notify({ type: 'positive', message: 'Anuncio eliminado', timeout: 2000 })
}

onMounted(cargarGuardados)

function agregarFoto (file) {
  if (!file) return
  fotos.value.push(file)
  nuevaFoto.value = null
  fotoSlide.value = fotos.value.length
}

function quitarFoto () {
  fotos.value.pop()
  if (fotoSlide.value > fotos.value.length) fotoSlide.value = fotos.value.length
}

function tamanoKB (file) {
  return Math.round(file.size / 1024) + ' kb'
}

function tipoFoto (file) {
  const t = file.type.split('/')[1]
  return t === 'jpeg' ? 'jpg' : t
}

const preview = computed(() => {
  const ultima = fotos.value[fotos.value.length - 1]
  return ultima ? URL.createObjectURL(ultima) : null
})

function validar () {
  if (!form.titulo) return 'Falta el titulo del anuncio'
  if (!form.marca) return 'Falta la marca'
  if (!form.modelo) return 'Falta el modelo'
  if (!form.pantalla || Number.isNaN(parseFloat(form.pantalla))) return 'La pantalla debe ser un numero decimal (ej: 5.5)'
  if (!form.sistema) return 'Falta el sistema operativo'
  if (!form.vendedor) return 'Falta el vendedor'
  if (!/^\d{4}-\d{4}$/.test(form.telefono)) return 'El telefono debe tener el formato ####-####'
  if (!form.precio || Number(form.precio) <= 0) return 'Falta el precio'
  return null
}

async function crear () {
  const error = validar()
  if (error) {
    $q.notify({ type: 'negative', message: error, timeout: 2000 })
    return
  }
  try {
    const fotoIds = []

    for (let i = 0; i < fotos.value.length; i++) {
      const f = fotos.value[i]
      const id = `foto-${Date.now()}-${i}`
      const ext = tipoFoto(f)
      await api.put(`/fotos/${id}/foto.${ext}`, f, {
        headers: { 'Content-Type': f.type }
      })
      fotoIds.push(`${id}/foto.${ext}`)
    }

    await addDoc(collection(db, 'anuncios'), {
      titulo: form.titulo,
      estado: form.estado,
      marca: form.marca,
      modelo: form.modelo,
      pantalla: form.pantalla,
      sistema: form.sistema,
      rom: form.rom,
      ram: form.ram,
      vendedor: form.vendedor,
      telefono: form.telefono,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      fecha: serverTimestamp(),
      fotoIds
    })

    $q.notify({
      type: 'positive',
      message: 'Se guardó satisfactoriamente', timeout: 2000
    })
    router.push('/')
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Error al crear el anuncio', timeout: 2000
    })
  }
}
</script>

<style scoped>
.campo {
  min-width: 85px;
  font-weight: bold;
}
.campo-right {
  min-width: 100px;
  font-weight: bold;
}
.caja-preview {
  height: 200px;
  border: 1px solid #ddd;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.etiqueta-precio {
  position: absolute;
  top: -12px;
  left: 16px;
  background: white;
}
.cuadro-negro {
  border: 2px solid black;
}
.campo-movil {
  min-width: 72px;
  font-weight: 500;
}
</style>
