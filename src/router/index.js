import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    component: () => import('../pages/Home.vue'),
    children: [
      {
        path: 'user',
        component: () => import('../pages/user/User.vue')
      },
      {
        path: 'player',
        component: () => import('../pages/player/Player.vue')
      },
      {
        path: 'search/:keywords',
        component: () => import('../pages/search/SearchDetail.vue')
      },
      {
        path: 'album-detail/:id',
        component: () => import('../pages/artist/AlbumDetail.vue'),
      },
      {
        path: 'artist-detail',
        component: () => import('../pages/artist/ArtistDetail.vue')
      },
      {
        path: 'mv/:id',
        component: () => import('../pages/mv/MvDetail.vue')
      },
      {
        path: 'discover',
        component: () => import('../pages/child/Discover.vue'),
      },
      {
        path: '/',
        redirect: '/home/discover'
      },
      {
        path: 'toplist',
        component: () => import('../pages/child/Toplist.vue')
      },
      {
        path: 'playlist',
        component: () => import('../pages/child/Playlist.vue')
      },
      {
        path: 'djradio',
        component: () => import('../pages/child/Djradio.vue')
      },
      {
        path: 'artist',
        component: () => import('../pages/child/Artist.vue'),
      },
      {
        path: 'album',
        component: () => import('../pages/child/Album.vue')
      },
      {
        path: 'playlist/:id',
        component: () => import('../pages/music/Playlist.vue')
      }
    ],
  },
  {
    path: '/',
    redirect: '/home'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
