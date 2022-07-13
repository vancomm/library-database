import express from 'express';
import connectToDb from '../services/connect-to-db.js';
import Patron from '../models/Patron.js';

const router = express.Router();

const db = connectToDb();

router.get('/', async (req, res) => {
  const patrons = await Patron.getAll(db);
  console.log(patrons);
  res.status(200).send(patrons);
});

router.post('/', async (req, res) => {
  const patron = req.body;
  console.log(patron);
  await Patron.insert(db, patron);
  res.status(200).json(patron);
});

export default router;
