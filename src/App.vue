<template>
  <div id="app">
    <button @click="toggleView">{{ showingPosts ? 'Activity' : 'Show Posts' }}</button>
    <component :is="currentView"></component>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ActivityList from './components/ActivityList.vue'
import PostList from './components/PostList.vue'

const showingPosts = ref(false)

const toggleView = () => {
  showingPosts.value = !showingPosts.value
}

const currentView = computed(() => showingPosts.value ? PostList : ActivityList)
</script>

<style scoped>
/* your styles here */
html, body {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

#app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 70%;
  padding: 20px;
}

#app {
  font-family: 'Times New Roman', Times, serif;
  width: 100%;
  max-width: 1000px;
  background-color: #2d0707;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(68, 67, 67, 0.1);
  text-align: center;
  padding: 40px;
}

h1 {
  color: #eec0c0;
  margin-bottom: 20px;
  text-align: center;
}

.input-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-container input {
  flex: 1;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #2c0808;
  border-radius: 5px;
  margin-right: 10px;
  max-width: 400px;
}

.input-container button {
  padding: 10px 20px;
  background-color: #f87474;
  color: #2d0707;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.input-container button:hover {
  background-color: #361616;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.activity-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #080707;
  border: 1px solid #812e2e;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
  text-align: center;
}

.activity-item:hover {
  background-color: #921d1d;
}

.completed {
  text-decoration: line-through;
  color: #777;
}
</style>
