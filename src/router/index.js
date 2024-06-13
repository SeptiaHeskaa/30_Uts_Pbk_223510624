import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import PostList from '../views/PostList.vue';
import AlbumList from '../views/AlbumList.vue';
import AlbumPhotoList from '../views/AlbumPhotoList.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/posts',
    name: 'Post',
    component: PostList,
  },
  {
    path: '/albums',
    name: 'Album',
    component: AlbumList,
  },
  {
    path: '/albums/:id',
    name: 'Album Photo',
    component: AlbumPhotoList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
