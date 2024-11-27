import {Pool} from "pg"

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DBPASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})
