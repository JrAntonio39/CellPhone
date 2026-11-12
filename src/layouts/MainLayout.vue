<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="store-header text-white">
      <q-toolbar>
        <q-btn class="lt-md q-mr-sm" icon="menu" flat round dense>
          <q-menu>
            <q-list style="min-width: 220px">
              <q-item>
                <q-item-section avatar>
                  <q-icon name="campaign" size="28px" color="primary" />
                </q-item-section>
                <q-item-section class="text-weight-bold">Tienda CellPhone</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup to="/">
                <q-item-section>Inicio</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/nuevo">
                <q-item-section>Nuevo Anuncio</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/carrito">
                <q-item-section>Carrito</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/estadisticas">
                <q-item-section>Estadisticas</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-icon class="gt-sm" name="campaign" size="32px"/>
        <q-toolbar-title class="gt-sm"> Tienda CellPhone </q-toolbar-title>

         <q-input v-model="busqueda" dense outlined bg-color="white" rounded placeholder="search" style="flex: 1 1 auto; max-width: 280px">
            <template #prepend>
              <q-icon name="search"/>
            </template>
        </q-input>

        <q-btn class="gt-sm" label="Inicio" to="/" flat/>
        <q-btn class="gt-sm" label ="Estadisticas" to="/estadisticas" flat/>
        <q-btn class="gt-sm" round color ="white" text-color="primary" icon="add" to="/nuevo"/>
        <q-btn class="gt-sm" round color="white" text-color="primary" icon="shopping_cart" to="/carrito">
          <q-badge v-if="carrito.length" color="red" floating>{{ carrito.length }}</q-badge>
        </q-btn>

      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { busqueda } from '@/composables/busqueda'
import { carrito } from '@/composables/carrito'
</script>
