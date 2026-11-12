const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/pages/IndexPage.vue') },
      { path: 'carrito', component: () => import('@/pages/CarritoPage.vue') },
      { path: 'detalle/:id', component:() => import('@/pages/DetallePage.vue')},
      { path: 'nuevo', component:() => import('@/pages/NuevoPage.vue')},
      { path: 'estadisticas', component:() => import('@/pages/EstadisticasPage.vue')},
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
]

export default routes
