import { patronsRoute } from '../data/routes.js';
import Service from './Service.js';

const Patron = new Service(patronsRoute);

export default Patron;
