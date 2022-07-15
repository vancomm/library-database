import express from 'express';
import Model from './Model.js';

export default function makeRouter(db, table) {
  const model = new Model(table);

  const router = express.Router();

  router.get('/', async (req, res) => {
    const { limit, offset } = req.query;
    if (limit !== undefined && offset !== undefined) {
      const records = await model.getPage(db, limit, offset);
      const count = await model.count(db);
      res.status(200).json({ count, records });
    } else {
      const records = await model.getAll(db);
      res.status(200).json({ records });
    }
  });

  router.post('/', async (req, res) => {
    const record = req.body;
    console.log(record);
    await model.insert(db, record);
    res.status(200).json(record);
  });

  router.delete('/', async (req, res) => {
    const { id } = req.body;
    console.log(id);
    await model.removeById(db, id);
    res.status(200).send(req.body);
  });

  router.patch('/', async (req, res) => {
    const { id, ...data } = req.body;
    console.log({ id, data });
    await model.updateById(db, id, data);
    res.status(200).json(id);
  });

  return router;
}
