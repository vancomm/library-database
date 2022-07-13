import insert from '../services/insert.js';
import select from '../services/select.js';

const Patron = {
  getAll: async (db) => select(db, 'patron'),
  insert: async (db, patron) => insert(db, 'patron', patron),
};

export default Patron;
