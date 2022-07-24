#!/usr/bin/env node

import dotenv from 'dotenv';
import fillDb from '../src/database/scripts/fill-db.js';

dotenv.config();

const dbPath = process.env.DATABASE_PATH;

fillDb(dbPath);
