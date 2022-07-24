#!/usr/bin/env node

import dotenv from 'dotenv';
import createDb from '../src/database/scripts/create-db.js';

dotenv.config();

const dbPath = process.env.DATABASE_PATH;

createDb(dbPath);
