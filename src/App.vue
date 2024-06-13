<template>
  <div id="app">
    <q-layout view="hHh lpR fFf">
      <q-header elevated>
        <q-toolbar>
          <router-link to="/" exact-active-class="active" class="q-item" exact>
            <q-item-label>Aktivitas</q-item-label>
          </router-link>
          <router-link to="/posts" exact-active-class="active" class="q-item" exact>
            <q-item-label>Post</q-item-label>
          </router-link>
          <router-link to="/albums" exact-active-class="active" class="q-item" exact>
            <q-item-label>Album</q-item-label>
          </router-link>
        </q-toolbar>
      </q-header>
      
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
.q-header {
  background-color: #4d0000;
  color: whitesmoke;
  padding: 15px;
  font-size: 18px;
}

.row {
  display: flex;
  justify-content: right;
}

.items-center {
  align-items: center;
}

.q-item {
  margin: 0 10px;
  text-decoration: none;
  color: inherit;
  padding-bottom: 5px;
}
</style>
