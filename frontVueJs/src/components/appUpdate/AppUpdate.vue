<template>
  <div id="app">
    <h2>Change data list</h2>
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.email" :class="{ 'editing': editingIndex === index }">
          <td>
            <span v-if="editingIndex !== index">{{ user.email }}</span>
            <input v-else type="text" v-model="editableUser.email" />
          </td>
          <td>
            <span v-if="editingIndex !== index">{{ user.number }}</span>
            <input v-else type="text" v-model="editableUser.number" />
          </td>
          <td>
            <span v-if="editingIndex !== index">{{ user.age }}</span>
            <input v-else type="number" v-model="editableUser.age" />
          </td>
          <td>
            <span v-if="editingIndex !== index">{{ user.fullname }}</span>
            <input v-else type="text" v-model="editableUser.fullname" />
          </td>
          <td>
            <span v-if="editingIndex !== index">{{ user.address }}</span>
            <input v-else type="text" v-model="editableUser.address" />
          </td>
          <td>
            <span v-if="editingIndex !== index">{{ user.birthday }}</span>
            <input v-else type="date" v-model="editableUser.birthday" />
          </td>
          <td>
            <span v-if="editingIndex !== index">{{ user.work }}</span>
            <input v-else type="text" v-model="editableUser.work" />
          </td>
          <td>
            <span v-if="editingIndex !== index">{{ user.PostWork }}</span>
            <input v-else type="text" v-model="editableUser.PostWork" />
          </td>
          <td class="edit-cell">
            <button v-if="editingIndex !== index" @click="startEditing(index, user)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
              </svg>
            </button>
            <button v-else @click="saveChanges(index)">Save</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Tahrirlangan ma'lumotlar uchun blok -->
    <div v-if="editingIndex !== null" class="edit-info">
      <h2>Tahrirlangan ma'lumotlar</h2>
      <div>
        <span>Email: {{ editableUser.email }}</span><br>
        <span>Number: {{ editableUser.number }}</span><br>
        <span>Age: {{ editableUser.age }}</span><br>
        <span>Full Name: {{ editableUser.fullname }}</span><br>
        <span>Address: {{ editableUser.address }}</span><br>
        <span>Birthday: {{ editableUser.birthday }}</span><br>
        <span>Work: {{ editableUser.work }}</span><br>
        <span>Post Work: {{ editableUser.PostWork }}</span><br>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      editingIndex: null,
      editableUser: {}
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios.get('http://localhost:3000/users')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    startEditing(index, user) {
      this.editingIndex = index;
      this.editableUser = { ...user };
    },
    saveChanges(index) {
      axios.put(`http://localhost:3000/usersUpdate/${index}`, this.editableUser)
        .then(() => {
          this.users[index] = { ...this.editableUser };
          this.editingIndex = null;
          this.showEditedMessage();
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    },
    showEditedMessage() {
      alert('Data updated successfully!');
    }
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
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

tr.editing {
  background-color: #e6ffe6; 
}

.drag-handle {
  cursor: grab; 
}
.drag-handle:hover {
  cursor: grabbing; 
}

button {
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

input[type="text"],
input[type="number"],
input[type="date"] {
  width: calc(100% - 20px); 
  padding: 5px;
  box-sizing: border-box;
}

.edit-info {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.edit-info h2 {
  margin-bottom: 10px;
}

.edit-info div {
  margin-top: 10px;
}

@media screen and (max-width: 600px) {
  input[type="text"],
  input[type="number"],
  input[type="date"] {
    width: 100%; 
  }
}
</style>
