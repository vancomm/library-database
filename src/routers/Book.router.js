import express from 'express';
import query from '../database/query.js';
import BookModel from '../database/models/Book.model.js';

function objToString(obj) {
  return JSON.stringify(obj, null, 2);
}

const BookRouter = express.Router();

const getAvailableQuery = `
SELECT c.* FROM copy c
LEFT JOIN borrow b
ON c.id = b.copyId
WHERE
  (c.bookId = ?)
  AND
  (c.discardedDate = '' OR c.discardedDate IS NULL)
  AND 
  (
    (b.borrowDate = '' OR b.borrowDate IS NULL)
    OR 
    (b.returnDate != '' AND b.returnDate IS NOT NULL)
  )
`;

BookRouter.get('/available-copy/:id', async (req, res) => {
  const { id } = req.params;
  const copies = await query(getAvailableQuery, [id]);
  if (copies.length === 0) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  const [copy] = copies;
  res.status(200).json({ id: copy.id });
});

BookRouter.get('/', async (req, res) => {
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
  const records = await BookModel.get({ limit, offset });
  const total = await BookModel.total();
  res.status(200).json({
    limit, offset, count: records.length, total, records,
  });
});

BookRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(id)) {
    res.status(422).json({ message: 'Id must be an integer', id });
    return;
  }
  const record = await BookModel.getById(id);
  if (!record) {
    res.status(404).json({ message: `No record with id ${id}.` });
    return;
  }
  res.status(200).json(record);
});

BookRouter.post('/get', async (req, res) => {
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
  const records = await BookModel.get(req.body);
  const total = await BookModel.total();
  res.status(200).json({
    limit, offset, count: records.length, total, records,
  });
});

BookRouter.post('/', async (req, res) => {
  try {
    const record = req.body;
    console.log(`Received record to insert into table ${BookModel.table}:\n${objToString(record)}`);
    const id = await BookModel.insert(record);
    res.status(201).json({ id });
  } catch (err) {
    res.status(409).json({ message: `Cannot post this entry. ${err}` });
  }
});

BookRouter.delete('/', async (req, res) => {
  try {
    const params = req.body;
    console.log(`Received params to delete from table ${BookModel.table}:\n${objToString(params)}`);
    await BookModel.remove(params);
    res.status(200).json(req.body);
  } catch (err) {
    res.status(409).json({ message: `Cannot delete this entry. ${err}` });
  }
});

BookRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Received request to delete from table record with id ${id}`);
    await BookModel.removeById(id);
    res.status(200).json({ id });
  } catch (err) {
    res.status(409).json({ message: `Cannot delete this entry. ${err}` });
  }
});

BookRouter.patch('/', async (req, res) => {
  try {
    const { id, ...data } = req.body;
    console.log(`Received data to update table ${BookModel.table} on id ${id}:\n${objToString(data)}`);
    await BookModel.updateById(id, data);
    res.status(200).json(id);
  } catch (err) {
    res.status(409).json({ message: `Cannot update this entry. ${err}` });
  }
});

BookRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(`Received data to update table ${BookModel.table} on id ${id}:\n${objToString(data)}`);
    await BookModel.updateById(id, data);
    const updated = await BookModel.getById(id);
    res.status(200).json(updated);
  } catch (err) {
    res.status(409).json({ message: `Cannot update this entry. ${err}` });
  }
});

export default BookRouter;
