import { Knex } from 'knex';
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, 'configs', `.${process.env.NODE_ENV}.env`) }) // load specified .env
dotenv.config({ path: path.resolve(__dirname, 'configs', '.env') }) // load .env

//creating config for knex migration
const config: Knex.Config = {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT)
    },
    pool: {
      min: 2,     
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    }, 
    seeds: {
      directory: './seeds',
    }
};

export default config
