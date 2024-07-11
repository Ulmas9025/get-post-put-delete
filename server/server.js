import express from 'express';
import bodyParser from 'body-parser';
import AuthRouter from './routes/auth.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(AuthRouter); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
