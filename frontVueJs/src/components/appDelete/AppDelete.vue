<template>
  <div class="container">
    <form @submit.prevent="deleteUser" class="form">
      <div class="form-group">
        <h2>Delete users</h2>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="number">Number:</label>
        <input type="text" id="number" v-model="number" required>
      </div>
    </form>

    <button @click="deleteUser" class="button delete">Delete User</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      email: '',
      number: ''
    };
  },
  methods: {
    deleteUser() {
      if (!this.email || !this.number) {
        console.error('Email and number are required for deleting user');
        return;
      }

      axios.delete(`http://localhost:3000/userDelete?email=${this.email}&number=${this.number}`)
        .then(response => {
          console.log('User deleted:', response.data);
          this.email = '';
          this.number = '';
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });

        this.$router.push('/')
    }
  }
};
</script>

<style scoped>
.container {
  width: 50%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

.button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #45a049;
}

.delete {
  background-color: #f44336;
  margin-top: 10px;
}

.delete:hover {
  background-color: #d32f2f;
}
</style>
