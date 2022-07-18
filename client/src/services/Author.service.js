import { authorsRoute } from '../data/routes';
import Service from './Service';

const AuthorService = new Service(authorsRoute);

export default AuthorService;
