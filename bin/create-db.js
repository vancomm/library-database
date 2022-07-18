#!/usr/bin/env node

import dotenv from 'dotenv';
import createDb from '../src/db/scripts/create-db.js';

dotenv.config();

const dbPath = process.env.DATABASE_PATH;

createDb(dbPath);
