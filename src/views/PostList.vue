<template>
    <div class="post-container">
      <select v-model="selectedUser" @change="fetchPosts">
        <option value="" disabled>Pilih pengguna</option>
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
      <div class="table-container">
        <table class="post-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Isi</th>
              <th>Aktivitas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in userPosts" :key="post.id" :class="post.editing ? 'editing' : ''">
              <td v-if="!post.editing"><strong>{{ post.title }}</strong></td>
              <td v-else><input class="input-edit" v-model="post.title" /></td>
              <td v-if="!post.editing">{{ post.body }}</td>
              <td v-else><textarea class="input-edit" v-model="post.body"></textarea></td>
              <td class="td-btn">
                <button v-if="!post.editing" @click="editPost(post)" class="edit-button">Ubah</button>
                <button v-else @click="updatePost(post)" class="save-button">Simpan</button>
                <button @click="deletePost(post.id)" class="delete-button">Hapus</button>
                <button v-if="post.editing" @click="cancelEdit(post)" class="cancel-button">Batal</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        selectedUser: null,
        userPosts: [],
      };
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          this.users = await response.json();
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      },
      async fetchPosts() {
        try {
          if (!this.selectedUser) return;
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
          this.userPosts = await response.json();
          this.userPosts.forEach(post => {
            post.editing = false;
          });
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      },
      editPost(post) {
        post.editing = true;
      },
      async updatePost(post) {
        try {
          post.editing = false;
          console.log('Updated Post:', post);
        } catch (error) {
          console.error('Error updating post:', error);
        }
      },
      cancelEdit(post) {
        post.editing = false;
        this.fetchPosts();
      },
      async deletePost(postId) {
        try {
          this.userPosts = this.userPosts.filter(post => post.id !== postId);
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      }
    },
    mounted() {
      this.fetchUsers();
    },
    watch: {
      selectedUser() {
        this.fetchPosts();
      },
    }
  };
  </script>
  
  <style scoped>
  .post-container {
    margin-top: 20px;
    text-align: center;
    color: whitesmoke;
  }
  
  select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  
  .table-container {
    margin: 0 auto;
    width: 75%;
    background-color: #4d0000;
    color: whitesmoke;
    margin-bottom: 50px;
  }
  
  .post-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    border-radius: 5px;
  }
  
  .post-table th, .post-table td {
    border: 1px solid whitesmoke ;
    padding: 12px;
  }
  
  .post-table th {
    background-color: #4d0000;
    color: white;
    text-align: center;
  }
  
  .post-table td {
    color: whitesmoke;
  }
  
  .td-btn {
    width: 200px;
    text-align: center;
  }
  
  .edit-button, .save-button, .delete-button, .cancel-button {
    padding: 8px 16px;
    margin-right: 8px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit-button {
    background-color: #8B0000;
    color: white;
  }
  
  .edit-button:hover {
    background-color: #B22222;
  }
  
  .save-button {
    background-color: #8B0000;
    color: white;
  }
  
  .save-button:hover {
    background-color: #B22222;
  }
  
  .delete-button {
    background-color: #f44336;
    color: white;
  }
  
  .delete-button:hover {
    background-color: #da190b;
  }
  
  .cancel-button {
    background-color: #ccc;
    color: black;
  }
  
  .cancel-button:hover {
    background-color: #bbb;
  }
  
  .input-edit, textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .input-edit:focus, textarea:focus {
    outline: none;
    border-color: #8B0000;
  }
  </style>
  