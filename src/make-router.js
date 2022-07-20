import express from 'express';

function objToString(obj) {
  return JSON.stringify(obj, null, 2);
}

export default function makeRouter(db, model) {
  const router = express.Router();

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
      const params = req.body;
      console.log(`Received params to delete from table ${model.table}:\n${objToString(params)}`);
      await model.remove(db, params);
      res.status(200).send(req.body);
    } catch (err) {
      res.status(409).json({ message: `Cannot delete this entry. ${err}` });
    }
  });

  router.patch('/', async (req, res) => {
    try {
      const { id, ...data } = req.body;
      console.log(`Received data to update table ${model.table} on id ${id}:\n${objToString(data)}`);
      await model.updateById(db, id, data);
      res.status(200).json(id);
    } catch (err) {
      res.status(409).json({ message: `Cannot update this entry. ${err}` });
    }
  });

  return router;
}
