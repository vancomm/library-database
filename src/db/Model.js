import insertOne from './crud/insert-one.js';
import remove from './crud/remove.js';
import select from './crud/select.js';
import update from './crud/update.js';
import count from './utils/count.js';

export default class Model {
  table;

  constructor(table) {
    this.table = table;
  }

  async count(db) {
    return count(db, this.table);
  }

  async get(db, params) {
    return select(db, this.table, params);
  }

  async insert(db, record) {
    return insertOne(db, this.table, record);
  }

  async removeById(db, id) {
    return remove(db, this.table, { id });
  }

  async updateById(db, id, data) {
    return update(db, this.table, { id }, data);
  }
}
