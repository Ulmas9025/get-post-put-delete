<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Number</th>
            <th>Age</th>
            <th>Full Name</th>
            <th>Address</th>
            <th>Birthday</th>
            <th>Work</th>
            <th>Post Work</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.email">
            <td>{{ user.email }}</td>
            <td>{{ user.number }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.fullname }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.birthday }}</td>
            <td>{{ user.work }}</td>
            <td>{{ user.PostWork }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [],
      };
    },
    mounted() {
      axios.get('http://localhost:3000/users')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
  };
  </script>
  
  <style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 100px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  tr:hover {
    background-color: #ddd;
  }
  </style>
  