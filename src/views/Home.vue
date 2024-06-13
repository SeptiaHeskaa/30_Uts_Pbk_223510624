<template>
    <div class="container">
      <h1>Aktivitas Saya</h1>
      <div class="input-container">
        <input type="text" v-model="newActivity" placeholder="Aktivitas Baru" />
        <button @click="addActivity" class="button-add">Tambah</button>
      </div>
  
      <ul>
        <li v-for="(activity, index) in filteredActivities" :key="index" class="activity-item">
          <span v-if="index !== editingIndex" :class="{ completed: activity.completed }">{{ activity.name }}</span>
          <input v-else type="text" v-model="editedActivityName" @keyup.enter="saveEdit" @keyup.esc="cancelEdit" />
          <div>
            <button @click="toggleCompletion(index)" class="button-check">
              {{ activity.completed ? 'Batal Checklist' : 'Checklist' }}
            </button>
            <button @click="editActivity(index)" class="button-edit">
              {{ index === editingIndex ? 'Simpan' : 'Ubah' }}
            </button>
            <button @click="removeActivity(index)" class="button-remove">Hapus</button>
          </div>
        </li>
      </ul>
  
      <div class="filter-container">
        <input type="checkbox" id="showOnlyPending" v-model="showOnlyPending" />
        <label for="showOnlyPending"></label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const newActivity = ref('')
  const editedActivityName = ref('')
  const editingIndex = ref(-1)
  const activities = ref([])
  const showOnlyPending = ref(false)
  
  const addActivity = () => {
    if (newActivity.value.trim() !== '') {
      activities.value.push({ name: newActivity.value, completed: false })
      newActivity.value = ''
    }
  }
  
  const removeActivity = (index) => {
    activities.value.splice(index, 1)
  }
  
  const toggleCompletion = (index) => {
    activities.value[index].completed = !activities.value[index].completed
  }
  
  const editActivity = (index) => {
    editedActivityName.value = activities.value[index].name
    editingIndex.value = index
  }
  
  const saveEdit = () => {
    if (editedActivityName.value.trim() !== '') {
      activities.value[editingIndex.value].name = editedActivityName.value
      cancelEdit()
    }
  }
  
  const cancelEdit = () => {
    editedActivityName.value = ''
    editingIndex.value = -1
  }
  
  const filteredActivities = computed(() => {
    if (showOnlyPending.value) {
      return activities.value.filter(activity => !activity.completed)
    }
    return activities.value
  })
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    text-align: center;
    background-color: #4d0000;
    color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .container h1 {
    font-size: 32px;
    font-weight: bolder;
  }
  
  .input-container, .filter-container {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .input-container input, .input-container button {
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .input-container input {
    flex: 1;
  }
  
  .input-container .button-add {
    cursor: pointer;
    background-color: #800000;
    color: white;
    border: none;
  }
  
  .input-container .button-add:hover {
    background-color: #660000;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  .activity-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .activity-item input[type="text"] {
    flex: 1;
    margin-right: 10px;
    padding: 5px;
  }
  
  .completed {
    text-decoration: line-through;
  }
  
  .button-check, .button-edit, .button-remove {
    margin-left: 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .button-check {
    background-color: #800000;
    color: white;
  }
  
  .button-check:hover {
    background-color: #660000;
  }
  
  .button-edit {
    background-color: #800000;
    color: white;
  }
  
  .button-edit:hover {
    background-color: #660000;
  }
  
  .button-remove {
    background-color: #800000;
    color: white;
  }
  
  .button-remove:hover {
    background-color: #660000;
  }
  
  .filter-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .filter-container input {
    margin-right: 10px;
  }
  </style>
  