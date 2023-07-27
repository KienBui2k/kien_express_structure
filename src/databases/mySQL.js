import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql';
let mySQL = mysql.createConnection({
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER_NAM,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE
});

function mysqlConnect() {
    try {
        mySQL.connect((err) => {
            if (err) {
                console.log("Lỗi về MySQL: ", err.sqlMessage);
            } else {
                console.log("kêt nối  MySQL thành công!");
            }
        });
    }
    catch (err) {
        console.log("Lỗi cứ pháp");
    }
}
module.exports = {
    mysqlConnect,
    mySQL
}