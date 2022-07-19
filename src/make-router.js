import express from 'express';
import Model from './db/Model.js';

function objToString(obj) {
  return JSON.stringify(obj, null, 2);
}

export default function makeRouter(db, table) {
  const model = new Model(table);

  const router = express.Router();

  router.get('/', async (req, res) => {
    const records = await model.get(db, req.query);
    const count = await model.count(db);
    res.status(200).json({ count, records });
  });

  router.post('/get', async (req, res) => {
    const records = await model.get(db, req.body);
    const count = await model.count(db);
    res.status(200).json({ count, records });
  });

  router.post('/', async (req, res) => {
    try {
      const record = req.body;
      console.log(`Received record to insert into table ${model.table}:\n${objToString(record)}`);
      const data = await model.insert(db, record);
      res.status(200).json(data);
    } catch (err) {
      res.status(409).json({ message: `Cannot post this entry. ${err}` });
    }
  });

  router.delete('/', async (req, res) => {
    try {
      const { id } = req.body;
      console.log(`Recieved id ${id} to delete from table ${model.table}`);
      await model.removeById(db, id);
      res.status(200).send(req.body);
    } catch (err) {
      res.status(409).json({ message: `Cannot delete this entry. ${err}` });
    }
  });

  router.patch('/', async (req, res) => {
    try {
      const { id, ...data } = req.body;
      console.log(`Recieved data to update table ${model.table} on id ${id}:\n${objToString(data)}`);
      await model.updateById(db, id, data);
      res.status(200).json(id);
    } catch (err) {
      res.status(409).json({ message: `Cannot update this entry. ${err}` });
    }
  });

  return router;
}
