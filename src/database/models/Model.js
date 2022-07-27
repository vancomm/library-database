import insertOne from '../crud/insert-one.js';
import remove from '../crud/remove.js';
import select from '../crud/select.js';
import update from '../crud/update.js';
import total from '../utils/total.js';

export default class Model {
  table;

  constructor(table) {
    this.table = table;
  }

  async total() {
    return total(this.table);
  }

  async get(params) {
    return select(this.table, params);
  }

  async getById(id) {
    // const [one] = await select(this.table, { where: { id } });
    console.log(id);
    const [one] = await this.get({ where: { id } });
    return one;
  }

  async findOne(params) {
    // const [one] = await select(this.table, { where: params });
    const [one] = await this.get({ where: params });
    return one;
  }

  async exists(where) {
    // const res = await select(this.table, { where: params });
    const res = await this.get({ where });
    return res.length > 0;
  }

  async insert(data) {
    return insertOne(this.table, data);
  }

  async remove(params) {
    return remove(this.table, params);
  }

  async removeById(id) {
    return remove(this.table, { where: { id } });
  }

  async updateById(id, data) {
    return update(this.table, { id }, data);
  }
}
