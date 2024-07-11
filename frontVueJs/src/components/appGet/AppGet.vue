<template>
  <div class="container">
    <form @submit.prevent="submitUsers" class="form">
      <div class="form-group">
        <h2>Get Methods</h2>
        <div class="input-group mb-3">
          <span class="input-group-text h-25">Email:</span>
          <input type="email" id="email" class="form-control h-25" v-model="email" required />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text h-25">Number:</span>
          <input type="text" id="number" class="form-control h-25" v-model="number" required />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div class="results">
      <div v-if="Object.keys(User).length !== 0">
        <h3>Results:</h3>
        <ul>
          <li>
            <p>Email: {{ User.email }}</p>
            <p>Age: {{ User.age }}</p>
            <p>Full Name: {{ User.fullname }}</p>
            <p>Address: {{ User.address }}</p>
            <p>Birthday: {{ User.birthday }}</p>
            <p>Work: {{ User.work }}</p>
            <p>Post Work: {{ User.PostWork }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No results found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'submit',
  data() {
    return {
      email: '',
      number: '',
      User: {}
    };
  },
  methods: {
    submitUsers() {
      axios.get('http://localhost:3000/userGet', {
        params: {
          email: this.email,
          number: this.number
        }
      })
        .then(response => {
          console.log(response.data);
          this.User = response.data;
        })
        .catch(error => {
          console.error('Error submitting user data:', error);
        });
    }
  }
};
</script>

<style scoped>
.container {
  width: 50%;
  margin: 20px auto; /* Centering the container */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 15px;
}

.input-label {
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 30px;
}

.btn {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  margin-top: 10px;
}

.btn:hover {
  background-color: #45a049;
}

.results {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 5px 0;
}
</style>