<template>
  <div>
    <h1>Postingan</h1>
    <select v-model="selectedUser">
      <option value="">Select user</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <ul v-if="selectedUser">
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const selectedUser = ref(null)
const users = ref([])
const posts = ref([])

const fetchUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    users.value = await response.json()
  } catch (error) {
    console.error('Error Fetching Users:', error)
  }
}

const fetchPosts = async () => {
  if (!selectedUser.value) return
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`)
    posts.value = await response.json()
  } catch (error) {
    console.error('Error Fetching Posts:', error)
  }
}

watch(selectedUser, fetchPosts)

onMounted(() => {
  fetchUsers()
})
</script>

