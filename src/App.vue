<template>
  <div id="app">
    <h1>My Activity</h1>
    <div class="input-container">
      <input type="text" v-model="newActivity" placeholder="New Task">
      <button @click="addActivity">Add</button>
    </div>

    <ul v-if="!showingPosts">
      <li v-for="(activity, index) in filteredActivities" :key="index" class="activity-item">
        <span v-if="index !== editingIndex" :class="{ completed: activity.completed }">{{ activity.name }}</span>
        <input v-else type="text" v-model="editedActivityName" @keyup.enter="saveEdit" @keyup.esc="cancelEdit">
        <div>
          <button @click="toggleCompletion(index)" class="action-button">{{ activity.completed ? 'Batal Checklist' : 'Checklist' }}</button>
          <button @click="editActivity(index)" class="action-button">{{ index === editingIndex ? 'Simpan' : 'Edit' }}</button>
          <button @click="removeActivity(index)" class="action-button">Remove</button>
        </div>
      </li>
    </ul>

    <div class="filter-container" v-if="!showingPosts">
      <input type="checkbox" id="showOnlyPending" v-model="showOnlyPending">
      <label for="showOnlyPending">Undone Task</label>
    </div>

    <button @click="showPostsView" v-if="!showingPosts">Show Posts</button>

    <div v-if="showingPosts">
      <h1>Postingan</h1>
      <select v-model="selectedUser">
        <option value="">Select user</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <ul v-if="selectedUser">
        <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
      </ul>
    </div>
    
    <button @click="showTodosView" v-if="showingPosts">Activity</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newActivity: '',
      editedActivityName: '',
      editingIndex: -1,
      activities: [],
      showOnlyPending: false,
      showingPosts: false,
      selectedUser: null,
      users: [],
      posts: []
    };
  },
  methods: {
    addActivity() {
      if (this.newActivity.trim() !== '') {
        this.activities.push({ name: this.newActivity, completed: false });
        this.newActivity = '';
      }
    },
    removeActivity(index) {
      this.activities.splice(index, 1);
    },
    toggleCompletion(index) {
      this.activities[index].completed = !this.activities[index].completed;
    },
    editActivity(index) {
      this.editedActivityName = this.activities[index].name;
      this.editingIndex = index;
    },
    saveEdit() {
      if (this.editedActivityName.trim() !== '') {
        this.activities[this.editingIndex].name = this.editedActivityName;
        this.cancelEdit();
      }
    },
    cancelEdit() {
      this.editedActivityName = '';
      this.editingIndex = -1;
    },
    async fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Error Fetching Users:', error);
      }
    },
    async fetchPosts() {
      if (!this.selectedUser) return;
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.error('Error Fetching Posts:', error);
      }
    },
    showPostsView() {
      this.showingPosts = true;
      this.fetchUsers();
    },
    showTodosView() {
      this.showingPosts = false;
    }
  },
  watch: {
    selectedUser() {
      this.fetchPosts();
    }
  },
  computed: {
    filteredActivities() {
      if (this.showOnlyPending) {
        return this.activities.filter(activity => !activity.completed);
      }
      return this.activities;
    }
  }
};
</script>

<style scoped>
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