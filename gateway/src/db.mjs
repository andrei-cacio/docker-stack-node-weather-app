import mysql from 'mysql';

import read from './secrets.mjs';

const poolConfig = {
  host: process.env.DB_HOST,
  user: read(process.env.DB_USER),
  password: read(process.env.DB_PASS),
  database: 'weather'
};

const pool = mysql.createPool(poolConfig);

pool.getConnection((err, con) => {
  if (con) {
    console.log('MySQL connection [OK]')
  } else {
    console.error('DB connection failed', poolConfig, err);
  }
});

function query(sql, params) {
  return new Promise(function (resolve, reject) {
      pool.query(sql, params, (err, results) => {
        return err ? reject(err) : resolve(results);
      });
    });
}

export default query;