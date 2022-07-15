import insertOne from './insert-one.js';
import remove from './remove.js';
import select from './select.js';
import selectPage from './select-page.js';
import update from './update.js';
import count from './count.js';

export default class Model {
  #table;

  constructor(table) {
    this.#table = table;
  }

  async count(db) {
    return count(db, this.#table);
  }

  async getAll(db) {
    return select(db, this.#table);
  }

  async getPage(db, limit, offset) {
    return selectPage(db, this.#table, undefined, limit, offset);
  }

  async insert(db, record) {
    return insertOne(db, this.#table, record);
  }

  async removeById(db, id) {
    return remove(db, this.#table, { id });
  }

  async updateById(db, id, data) {
    return update(db, this.#table, { id }, data);
  }
}
