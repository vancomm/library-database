import select from '../crud/select.js';
import Model from './Model.js';

const BorrowModel = new Model('borrow');

BorrowModel.get = async function get(params) {
  const borrows = await select(this.table, params);

  return Promise.all(borrows.map(async (borrow) => {
    const [copy] = await select('copy', { where: { id: borrow.copyId } });
    const book = await select('book', { where: { id: copy.bookId } });
    const patron = await select('patron', { where: { id: borrow.patronId } });

    return { ...borrow, book, patron };
  }));
};

export default BorrowModel;
