import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ text: 'Hello world!' });
});

console.log(`Server listening on port ${port}`);
app.listen(port);
