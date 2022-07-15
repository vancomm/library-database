import { authorsRoute } from '../data/routes.js';
import Service from './Service.js';

const Author = new Service(authorsRoute);

export default Author;
