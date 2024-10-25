import 'dotenv/config';
import path from 'path';
import 'reflect-metadata';
import { DataSource } from "typeorm";

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [path.resolve(__dirname, '..', 'entities', '*.{ts,js}')],
    migrations: [path.resolve(__dirname, '..', 'migrations', '*.{ts,js}')],
})