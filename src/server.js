import dotenv from 'dotenv';
dotenv.config();

// connect mySQL

// import { mysqlConnect } from './databases/mySQL'
// mysqlConnect()


import express from 'express';
const server = express();
// body-parser
import bodyParser from "body-parser";
server.use(bodyParser.json());


import routerConfig from './routes'
server.use('/api', routerConfig)



server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port: ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`)
})