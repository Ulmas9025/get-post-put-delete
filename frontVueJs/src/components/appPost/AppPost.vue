<template>
  <div class="container">
    <form @submit.prevent="addUser" class="form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="number">Number:</label>
        <input type="text" v-model="number" required />
      </div>
      <div class="form-group">
        <label for="age">Age:</label>
        <input type="number" v-model="age" required />
      </div>
      <div class="form-group">
        <label for="fullname">Full Name:</label>
        <input type="text" v-model="fullname" required />
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" v-model="address" required />
      </div>
      <div class="form-group">
        <label for="birthday">Birthday:</label>
        <input type="date" v-model="birthday" required />
      </div>
      <div class="form-group">
        <label for="work">Work:</label>
        <input type="text" v-model="work" required />
      </div>
      <div class="form-group">
        <label for="PostWork">Post Work:</label>
        <input type="text" v-model="PostWork" required />
      </div>
      <button type="submit" class="button">Add User</button>
    </form>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      email: '',
      number: '',
      age: null,
      fullname: '',
      address: '',
      birthday: '',
      work: '',
      PostWork: '',
      errorMessage: ''
    };
  },
  methods: {
    addUser() {
      const newUser = {
        email: this.email,
        number: this.number,
        age: this.age,
        fullname: this.fullname,
        address: this.address,
        birthday: this.birthday,
        work: this.work,
        PostWork: this.PostWork
      };

      axios.post('http://localhost:3000/userPost', newUser)
        .then(response => {
          console.log('User added:', response.data);
          this.$router.push('/');
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            this.errorMessage = 'Email already exists';
          } else {
            console.error('Error adding user:', error);
            this.errorMessage = 'There was an error adding user.';
          }
        });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
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
.alert {
  margin-top: 20px;
  padding: 10px;
  color: white;
  border-radius: 5px;
}

.alert-danger {
  background-color: #f44336;
}
</style>