/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import resetDb from '../reset-db.js';
import connectToDb from '../connect-to-db.js';
import execute from '../execute.js';
import query from '../query.js';
import insertOne from '../insert-one.js';
import insertMany from '../insert-many.js';
import select from '../select.js';
import update from '../update.js';
import remove from '../remove.js';
import deleteDb from '../delete-db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getTestPath = (filename, ...subfolders) => path.join(__dirname, ...subfolders, filename);

const dbPath = getTestPath('test.db');

beforeEach(async () => {
  resetDb(dbPath);
  const db = connectToDb(dbPath);
  await execute(db, 'CREATE TABLE test (rowA, rowB, rowC)');
});

afterAll(async () => {
  deleteDb(dbPath);
});

describe('execute & query', () => {
  test('inserts & selects', async () => {
    const db = connectToDb(dbPath);
    await execute(db, 'INSERT INTO test (rowA, rowB) VALUES ("A", "B")');
    const rows = await query(db, 'SELECT rowA, rowB FROM test');
    expect(rows).toEqual([{ rowA: 'A', rowB: 'B' }]);
  });

  test('inserts & selects with params', async () => {
    const db = connectToDb(dbPath);
    await execute(db, 'INSERT INTO test (rowA, rowB) VALUES (?, ?)', ['A', 'B']);
    const rows = await query(db, 'SELECT rowA, rowB FROM test');
    expect(rows).toEqual([{ rowA: 'A', rowB: 'B' }]);
  });
});

describe('insert one', () => {
  test('inserts', async () => {
    const data = { rowA: 'Hello world!"; DROP TABLE test;', rowB: '100000\'', rowC: -123 };
    const db = connectToDb(dbPath);
    await insertOne(db, 'test', data);
    const rows = await select(db, 'test', Object.keys(data));
    expect(rows).toEqual([data]);
  });
});

describe('insert many', () => {
  test('inserts', async () => {
    const fields = ['rowA', 'rowB'];
    const rows = [
      ['A', 'B'],
      ['C', 100],
      [1, null],
      [0, 0],
    ];
    const db = connectToDb(dbPath);
    await insertMany(db, 'test', fields, rows);
    const res = await select(db, 'test', fields);
    expect(res.map((row) => Object.values(row))).toEqual(rows);
  });
});

describe('remove', () => {
  test('removes', async () => {
    const fields = ['rowA', 'rowB'];
    const rows = [
      ['A', 'B'],
      ['C', 100],
      ['A', null],
      [0, 0],
    ];
    const db = connectToDb(dbPath);
    await insertMany(db, 'test', fields, rows);
    await remove(db, 'test', { rowA: 'A' });
    const res = await select(db, 'test', fields);
    expect(res.map((row) => Object.values(row))).toEqual(rows.filter(([a]) => a !== 'A'));
  });
});

describe('update', () => {
  test('updates', async () => {
    const fields = ['rowA', 'rowB'];
    const rows = [
      ['A', 'B'],
      ['C', 100],
      ['A', null],
      [0, 'A'],
    ];
    const expected = [
      ['A', 'updated'],
      ['C', 100],
      ['A', null],
      [0, 'A'],
    ];
    const db = connectToDb(dbPath);
    await insertMany(db, 'test', fields, rows);
    await update(db, 'test', { rowA: 'A', rowB: 'B' }, { rowB: 'updated' });
    const actual = await select(db, 'test', fields);
    console.log(actual);
    expect(actual.map((row) => Object.values(row))).toEqual(expected);
  });
});
