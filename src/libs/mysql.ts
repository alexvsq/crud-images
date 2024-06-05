import mysql from "serverless-mysql";

export const pool = mysql({
  config: {
    host: "localhost",
    port: 3306,
    database: "nextmysql",
    user: "root",
    password: "12345678",
  },
});
