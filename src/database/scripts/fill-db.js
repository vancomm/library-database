/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker';
import connectToDb from '../connect-to-db.js';

import PatronModel from '../models/Patron.model.js';
import AuthorModel from '../models/Author.model.js';
import TagModel from '../models/Tag.model.js';
import PublisherModel from '../models/Publisher.model.js';
import CategoryModel from '../models/Category.model.js';
import BookModel from '../models/Book.model.js';
import BookTagModel from '../models/BookTag.model.js';
import BookCategoryModel from '../models/BookCategory.model.js';

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
    PatronModel.insert(db, createRandomPerson());
    AuthorModel.insert(db, createRandomPerson());
  });
  Array.from({ length: 50 }).forEach(() => {
    PublisherModel.insert(db, createRandomPublisher());
    TagModel.insert(db, createRandomTag());
    CategoryModel.insert(db, createRandomTag());
  });
}
