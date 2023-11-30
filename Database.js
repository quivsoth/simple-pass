import * as SQLite from 'expo-sqlite';
import {SQLError, SQLResultSet, SQLTransaction} from "expo-sqlite";
import julian from 'julian';

const db = SQLite.openDatabase('db3.db');

export const init = async () => {
    return new Promise((resolve, reject) => {
      // var now = new Date();           // Let's say it's Thu, 21 Nov 2013 10:47:02 GMT
      db.transaction(tx => {
        let sql = `CREATE TABLE IF NOT EXISTS sites (id INTEGER PRIMARY KEY NOT NULL, sitename TEXT NOT NULL, uri TEXT, secret TEXT NOT NULL, DateCreated REAL NOT NULL, DateModified REAL NOT NULL);`;
        let params = [];
        tx.executeSql(
          sql,
          params,
          (txObj, { rows: { _array } }) => {
            resolve(_array);
          },
          (txObj, error) => {
            console.log('Error ', error)
            return false;
          },
        );
      });
    });
};


export const getSites = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      let sql = "SELECT * FROM sites";
      let params = [];
      tx.executeSql(
        sql,
        params,
        (tx, { rows: { _array } }) => {
          resolve(_array);
        },
        (txObj, error) => {
          console.log('Error ', error);
          reject(error);
        },
      );
    });
  });
};