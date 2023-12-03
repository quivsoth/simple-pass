import * as SQLite from 'expo-sqlite';
import { SQLError, SQLResultSet, SQLTransaction } from "expo-sqlite";
import julian from 'julian';

const db = SQLite.openDatabase('db3.db');

export const init = async () => {
  return new Promise((resolve, reject) => {
    // var now = new Date();           // Let's say it's Thu, 21 Nov 2013 10:47:02 GMT
    db.transaction(tx => {
      let sql = `CREATE TABLE IF NOT EXISTS sites (siteId INTEGER PRIMARY KEY NOT NULL, sitename TEXT NOT NULL, uri TEXT, secret TEXT NOT NULL, DateCreated REAL NOT NULL, DateModified REAL NOT NULL);`;
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
      let sql = `SELECT * FROM sites`;
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

export const bulkInsertSiteCredentials = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      let sql = `INSERT INTO sites (sitename, secret, uri, DateCreated, DateModified) VALUES
      ('google', 'secretgoogle', 'www.google.com', 1, 1),
      ('facebook', 'secretfacebook', 'www.facebook.com', 1, 1),
      ('wellsfargo', 'secretwellsfargo', 'www.wellsfargo.com', 1, 1),
      ('yahoo', 'secretyahoo', 'www.yahoo.com', 1, 1),
      ('work', 'secretwork', 'www.work.com', 1, 1),
      ('roblox', 'secretroblox', 'www.roblox.com', 1, 1),
      ('att', 'secretatt', 'www.att.com', 1, 1),
      ('verizon', 'secretverizon', 'www.verizon.com', 1, 1),
      ('turbotax', 'secretturbotax', 'www.turbotax.com', 1, 1),
      ('ezpass', 'secretezpass', 'www.ezpass.com', 1, 1),
      ('aa', 'secretaa', 'www.aa.com', 1, 1),
      ('united', 'secretunited', 'www.united.com', 1, 1),
      ('github', 'secretgithub', 'www.github.com', 1, 1),
      ('godaddy', 'secretgodaddy', 'www.godaddy.com', 1, 1),
      ('nba', 'secretnba', 'www.nba.com', 1, 1),
      ('espn', 'secretespn', 'www.espn.com', 1, 1),
      ('redhat', 'secretredhat', 'www.redhat.com', 1, 1),
      ('blueridge', 'secretblueridge', 'www.blueridge.com', 1, 1),
      ('cnn', 'secretcnn', 'www.cnn.com', 1, 1),
      ('amazon', 'secretamazon', 'www.amazon.com', 1, 1),
      ('wish', 'secretwish', 'www.wish.com', 1, 1)`;
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

export const updateCredentials = async (item, data) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE sites SET sitename = ?, secret = ?, uri = ? WHERE siteId = ?`;
    let params = [data.sitename, data.secret, data.uri, item.siteId]; //storing user data in an array
    db.transaction(tx => {
      sql,
      params,
      tx.executeSql(
        sql,
        params,
        (tx, { rowsAffected }) => {          
          resolve(rowsAffected);
        },
        (txObj, error) => {
          console.log('Error ', error);
          reject(error);
        },
      );
    });
  });
}