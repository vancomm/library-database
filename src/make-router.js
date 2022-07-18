import express from 'express';
import Model from './db/Model.js';

function objToString(obj) {
  return `{\n${Object.entries(obj).reduce((str, [key, value]) => str.concat(`  ${key}: ${value}\n`), '')}}`;
}

export default function makeRouter(db, table) {
  const model = new Model(table);

  const router = express.Router();

  router.get('/', async (req, res) => {
    const records = await model.get(db, req.query);
    const count = await model.count(db);
    res.status(200).json({ count, records });
  });

  router.post('/', async (req, res) => {
    const record = req.body;
    console.log(`Received record to insert into table ${model.table}:\n${objToString(record)}`);
    await model.insert(db, record);
    res.status(200).json(record);
  });

  router.delete('/', async (req, res) => {
    const { id } = req.body;
    console.log(`Recieved id ${id} to delete from table ${model.table}`);
    await model.removeById(db, id);
    res.status(200).send(req.body);
  });

  router.patch('/', async (req, res) => {
    const { id, ...data } = req.body;
    console.log(`Recieved data to update table ${model.table} on id ${id}:\n${objToString(data)}`);
    await model.updateById(db, id, data);
    res.status(200).json(id);
  });

  return router;
}
