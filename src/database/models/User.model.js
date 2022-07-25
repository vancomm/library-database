import select from '../crud/select.js';
import Model from './Model.js';

const UserModel = new Model('user');

UserModel.get = async function get(params) {
  const users = await select(this.table, params);

  return Promise.all(users.map(async (user) => {
    const patron = await select('patron', { where: { id: user.patronId } });
    return { ...user, patron };
  }));
};

export default UserModel;
