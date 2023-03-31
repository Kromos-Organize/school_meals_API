import {config} from "dotenv";
import process from "node:process";

config({path: process.cwd() +`/.${process.env.NODE_ENV}.env`})

module.exports = {
  
  "development": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB_NAME,
    "host": process.env.POSTGRES_HOST,
    "dialect": "postgres"
  },
  
  "test": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB_NAME,
    "host": process.env.POSTGRES_HOST,
    "dialect": "postgres"
  },
  
  "production": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB_NAME,
    "host": process.env.POSTGRES_HOST,
    "dialect": "postgres"
  },
}
