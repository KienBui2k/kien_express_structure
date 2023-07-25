import dotenv from 'dotenv';
dotenv.config();

// connect mySQL

import { mysqlConnect } from './databases/mySQL'
mysqlConnect()


import express from 'express';
const server = express();

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port: ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`)
})