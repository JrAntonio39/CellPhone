<template>
  <q-page class="q-pa-md">
    <div class="page-panel cart-panel rounded-borders q-pa-md">
      <div class="text-h5 text-center text-italic text-weight-bold q-mb-md">Carrito de Compras</div>

      <div v-if="!carrito.length" class="text-center text-grey-7">No has agregado anuncios al carrito</div>

      <q-list v-else separator class="cuadro-negro rounded-borders cart-list">
        <q-item v-for="a in carrito" :key="a.id">
          <q-item-section>
            <q-item-label class="text-weight-bold">{{ a.titulo }}</q-item-label>
            <q-item-label caption>Vendedor: {{ a.vendedor }} / Telefono: {{ a.telefono }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <div class="row items-center q-gutter-sm">
              <span class="text-h6 text-primary">${{ a.precio }}</span>
              <q-btn round dense color="negative" icon="delete" @click="quitarDelCarrito(a.id)" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { carrito, quitarDelCarrito } from '@/composables/carrito'
</script>

<style scoped>
.cuadro-negro {
  border: 2px solid black;
}
.cart-panel {
  width: 100%;
  min-height: calc(100vh - 90px);
}
.cart-list {
  background: rgba(232, 246, 236, 0.3);
}
</style>
