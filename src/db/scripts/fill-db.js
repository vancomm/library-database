/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import connectToDb from '../connect-to-db.js';
import Model from '../Model.js';

const Patron = new Model('patron');
const Author = new Model('author');
const Tag = new Model('tag');
const Publisher = new Model('publisher');
const Category = new Model('category');

function createRandomPerson() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
  };
}

function createRandomTag() {
  return {
    name: faker.word.adjective(),
  };
}

function createRandomPublisher() {
  const contact = createRandomPerson();
  return {
    name: faker.company.companyName(),
    contactFirstName: contact.firstName,
    contactLastName: contact.lastName,
    contactPhone: contact.phone,
    contactEmail: contact.email,
  };
}

export default async function fillDb(path) {
  const db = connectToDb(path);
  Array.from({ length: 1500 }).forEach(() => {
    Patron.insert(db, createRandomPerson());
    Author.insert(db, createRandomPerson());
  });
  Array.from({ length: 50 }).forEach(() => {
    Publisher.insert(db, createRandomPublisher());
    Tag.insert(db, createRandomTag());
    Category.insert(db, createRandomTag());
  });
}
