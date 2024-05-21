<template>
  <div>
    <h1>My Activity</h1>
    <div class="input-container">
      <input type="text" v-model="newActivity" placeholder="New Task" />
      <button @click="addActivity">Add</button>
    </div>

    <ul>
      <li v-for="(activity, index) in filteredActivities" :key="index" class="activity-item">
        <span v-if="index !== editingIndex" :class="{ completed: activity.completed }">{{ activity.name }}</span>
        <input v-else type="text" v-model="editedActivityName" @keyup.enter="saveEdit" @keyup.esc="cancelEdit" />
        <div>
          <button @click="toggleCompletion(index)" class="action-button">
            {{ activity.completed ? 'Batal Checklist' : 'Checklist' }}
          </button>
          <button @click="editActivity(index)" class="action-button">
            {{ index === editingIndex ? 'Simpan' : 'Edit' }}
          </button>
          <button @click="removeActivity(index)" class="action-button">Remove</button>
        </div>
      </li>
    </ul>

    <div class="filter-container">
      <input type="checkbox" id="showOnlyPending" v-model="showOnlyPending" />
      <label for="showOnlyPending">Undone Task</label>
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
/* your styles here */
.input-container, .filter-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-container input, .input-container button {
  padding: 10px;
  margin-right: 10px;
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
}

.completed {
  text-decoration: line-through;
}

</style>
