import Model from './Model.js';
import select from '../crud/select.js';
import insertMany from '../crud/insert-many.js';
import range from '../../utils/range.js';

const CopyModel = new Model('copy');

CopyModel.get = async function get(params) {
  const copies = await select(this.table, params);
  return Promise.all(copies.map(async (copy) => {
    const book = await select('book', { where: { id: copy.bookId } });
    return ({ ...copy, book, number: 1 });
  }));
};

CopyModel.insert = async function insert(record) {
  const {
    number, bookId, acquiredDate, discardedDate,
  } = record;
  return insertMany(this.table, ['bookId', 'acquiredDate', 'discardedDate'], range(number).map(() => [bookId, acquiredDate, discardedDate]));
};

export default CopyModel;
