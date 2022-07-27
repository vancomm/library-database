import express from 'express';
import calcCount from '../database/utils/calc-count.js';

function objToString(obj) {
  return JSON.stringify(obj, null, 2);
}

export default function makeRouter(model) {
  const router = express.Router();

  router.get('/', async (req, res) => {
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
    const records = await model.get({ limit, offset });
    const total = await model.total();
    const count = calcCount(limit, offset, total);
    res.status(200).json({
      limit, offset, count, total, records,
    });
  });

  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!Number.isInteger(id)) {
      res.status(422).json({ message: 'Id must be an integer' });
      return;
    }
    const record = await model.getById(id);
    if (!record) {
      res.status(404).json({ message: `No record with id ${id}.` });
      return;
    }
    res.status(200).json(record);
  });

  router.post('/get', async (req, res) => {
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
    const records = await model.get(req.body);
    const total = await model.total();
    const count = calcCount(limit, offset, total);
    res.status(200).json({
      limit, offset, count, total, records,
    });
  });

  router.post('/', async (req, res) => {
    try {
      const record = req.body;
      console.log(`Received record to insert into table ${model.table}:\n${objToString(record)}`);
      const id = await model.insert(record);
      res.status(201).json({ id });
    } catch (err) {
      res.status(409).json({ message: `Cannot post this entry. ${err}` });
    }
  });

  router.delete('/', async (req, res) => {
    try {
      const params = req.body;
      console.log(`Received params to delete from table ${model.table}:\n${objToString(params)}`);
      await model.remove(params);
      res.status(200).json(req.body);
    } catch (err) {
      res.status(409).json({ message: `Cannot delete this entry. ${err}` });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Received request to delete from table record with id ${id}`);
      await model.removeById(id);
      res.status(200).json({ id });
    } catch (err) {
      res.status(409).json({ message: `Cannot delete this entry. ${err}` });
    }
  });

  router.patch('/', async (req, res) => {
    try {
      const { id, ...data } = req.body;
      console.log(`Received data to update table ${model.table} on id ${id}:\n${objToString(data)}`);
      await model.updateById(id, data);
      res.status(200).json(id);
    } catch (err) {
      res.status(409).json({ message: `Cannot update this entry. ${err}` });
    }
  });

  router.patch('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      console.log(`Received data to update table ${model.table} on id ${id}:\n${objToString(data)}`);
      await model.updateById(id, data);
      const updated = await model.getById(id);
      res.status(200).json(updated);
    } catch (err) {
      res.status(409).json({ message: `Cannot update this entry. ${err}` });
    }
  });

  return router;
}
