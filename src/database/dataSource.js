import 'reflect-metadata';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DataSource } from 'typeorm';
import env from '../config/env.js';
import Customer from '../modules/customers/customer.entity.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const customerMigrationPath = path.join(__dirname, 'migrations', '1760245200000-CreateCustomersTable.js');

const dataSource = new DataSource({
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  ssl: env.db.ssl ? { rejectUnauthorized: false } : false,
  synchronize: false,
  logging: env.nodeEnv === 'development',
  entities: [Customer],
  migrations: [customerMigrationPath],
  migrationsTableName: 'migrations',
  subscribers: [],
});

export default dataSource;
