import dotenv from 'dotenv';
import connectToDb from './connect-to-db.js';

dotenv.config();

const db = connectToDb(process.env.DATABASE_PATH);

export default db;
