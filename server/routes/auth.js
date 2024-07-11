import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '..', 'data.json'); 

const readData = () => {
  try {
    if (fs.existsSync(filePath)) {
      const jsonData = fs.readFileSync(filePath);
      return JSON.parse(jsonData);
    } else {
      fs.writeFileSync(filePath, '[]');
      return [];
    }
  } catch (error) {
    console.error('Error reading data file:', error);
    throw error;
  }
};

const saveData = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data file:', error);
    throw error;
  }
};

let data = readData();


router.get('/userGet', (req, res) => {
  const { email, number } = req.query;
  const foundUser = data.find(user => user.email === email && user.number === number);
  if (foundUser) {
    res.status(200).json(foundUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


router.post('/userPost', (req, res) => {
  const { email, fullname, age , number,address,birthday,work,PostWork } = req.body;
  if (email && fullname && age) {
    const isEmailUnique = data.every(user => user.email !== email);
    if (isEmailUnique) {
      const newUser = { email, fullname, age , number,address,birthday,work,PostWork };
      data.push(newUser);
      saveData(data); 
      res.status(201).json({ message: 'User added successfully', user: newUser });
    } else {
      res.status(400).json({ message: 'Email already exists' });
    }
  } else {
    res.status(400).json({ message: 'Invalid data' });
  }
});

router.delete('/userDelete', (req, res) => {
  const { email, number } = req.query;
  const index = data.findIndex(user => user.email === email && user.number === number);

  if (index !== -1) {
    data.splice(index, 1);
    saveData(data); // Pass the data array to saveData
    res.status(200).json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

router.get('/users', (req, res) => {
  res.json(data);
});

router.put('/usersUpdate/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < data.length) {
    data[index] = req.body;
    saveData(data); // Pass the updated data array to saveData
    res.status(200).json({ message: 'User updated successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export default router;
