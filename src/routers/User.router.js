import express from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../database/models/User.model.js';
import calcCount from '../database/utils/calc-count.js';

function stripHash(user) {
  const { hash, ...data } = user;
  return data;
}

function objToString(obj) {
  return JSON.stringify(obj, null, 2);
}

const UserRouter = express.Router();

UserRouter.get('/', async (req, res) => {
  let { limit, offset } = req.query;
  if (limit) {
    limit = parseInt(limit, 10);
    if (Number.isNaN(limit)) {
      res.status(422).json({ message: 'Bad query param LIMIT (must be integer).' });
      return;
    }
  }
  if (offset) {
    offset = parseInt(offset, 10);
    if (Number.isNaN(offset)) {
      res.status(422).json({ message: 'Bad query param OFFSET (must be integer).' });
      return;
    }
  }
  const records = await UserModel.get(req.query).then((users) => users.map(stripHash));
  const total = await UserModel.total();
  const count = calcCount(limit, offset, total);
  res.status(200).json({
    limit, offset, count, total, records,
  });
});

UserRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const record = await UserModel.getById(id);
  if (!record) {
    res.status(404).json({ message: `No record with id ${id}.` });
    return;
  }
  res.status(200).json(stripHash(record));
});

UserRouter.post('/get', async (req, res) => {
  let { limit, offset } = req.body;
  if (limit) {
    limit = parseInt(limit, 10);
    if (Number.isNaN(limit)) {
      res.status(422).json({ message: 'Bad query param LIMIT (must be integer).' });
      return;
    }
  }
  if (offset) {
    offset = parseInt(offset, 10);
    if (Number.isNaN(offset)) {
      res.status(422).json({ message: 'Bad query param OFFSET (must be integer).' });
      return;
    }
  }
  const records = await UserModel.get(req.body).then((users) => users.map(stripHash));
  const total = await UserModel.total();
  const count = calcCount(limit, offset, total);
  res.status(200).json({
    limit, offset, count, total, records,
  });
});

UserRouter.post('/', async (req, res) => {
  try {
    console.log('Redirecting POST request from /user to /register.');
    res.redirect(307, '/register');
  } catch (err) {
    res.status(409).json({ message: `Cannot post this entry. ${err}` });
  }
});

UserRouter.delete('/', async (req, res) => {
  try {
    const params = req.body;
    console.log(`Received params to delete from table ${UserModel.table}:\n${objToString(params)}`);
    await UserModel.remove(params);
    res.status(200).json(req.body);
  } catch (err) {
    res.status(409).json({ message: `Cannot delete this entry. ${err}` });
  }
});

UserRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Received request to delete from table record with id ${id}`);
    await UserModel.removeById(id);
    res.status(200).json({ id });
  } catch (err) {
    res.status(409).json({ message: `Cannot delete this entry. ${err}` });
  }
});

UserRouter.patch('/', async (req, res) => {
  try {
    const { id, password, ...data } = req.body;
    console.log(`Received data to update table ${UserModel.table} on id ${id}:\n${objToString(data)}`);
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      await UserModel.updateById(id, { hash, ...data });
    } else {
      await UserModel.updateById(id, data);
    }
    const updated = await UserModel.getById(id).then(stripHash);
    res.status(200).json(updated);
  } catch (err) {
    res.status(409).json({ message: `Cannot update this entry. ${err}` });
  }
});

UserRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...data } = req.body;
    console.log(`Received data to update table ${UserModel.table} on id ${id}:\n${objToString(data)}`);
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      await UserModel.updateById(id, { hash, ...data });
    } else {
      await UserModel.updateById(id, data);
    }
    const updated = await UserModel.getById(id).then(stripHash);
    res.status(200).json(updated);
  } catch (err) {
    res.status(409).json({ message: `Cannot update this entry. ${err}` });
  }
});

export default UserRouter;
