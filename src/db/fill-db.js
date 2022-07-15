/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import connectToDb from './connect-to-db.js';
import * as Patron from './models/Patron.model.js';

function createRandomPatron() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
  };
}

export default async function fillDb(path) {
  const db = connectToDb(path);
  Array.from({ length: 1500 }).forEach(() => {
    Patron.insert(db, createRandomPatron());
  });
}
