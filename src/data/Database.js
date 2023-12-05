import * as SQLite from 'expo-sqlite';
import { SQLError, SQLResultSet, SQLTransaction } from "expo-sqlite";
import julian from 'julian';

const db = SQLite.openDatabase('db3.db');
let julianDate = julian(new Date());


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

export const createCredentials = async (item) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      let sql = `INSERT INTO sites (sitename, secret, uri, DateCreated, DateModified) VALUES (?, ?, ?, ?, ?)`;
      let params = [item.sitename.toLowerCase(), item.secret, item.uri.toLowerCase(), julianDate, julianDate];
      tx.executeSql(
        sql,
        params,
        (tx, result) => {
          resolve(result);
        },
        (txObj, error) => {
          console.log('Error ', error);
          reject(error);
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
      ('google', 'secretgoogle', 'www.google.com', ${julianDate}, ${julianDate}),
      ('facebook', 'secretfacebook', 'www.facebook.com', ${julianDate}, ${julianDate}),
      ('wellsfargo', 'secretwellsfargo', 'www.wellsfargo.com', ${julianDate}, ${julianDate}),
      ('yahoo', 'secretyahoo', 'www.yahoo.com', ${julianDate}, ${julianDate}),
      ('work', 'secretwork', 'www.work.com', ${julianDate}, ${julianDate}),
      ('roblox', 'secretroblox', 'www.roblox.com', ${julianDate}, ${julianDate}),
      ('att', 'secretatt', 'www.att.com', ${julianDate}, ${julianDate}),
      ('verizon', 'secretverizon', 'www.verizon.com', ${julianDate}, ${julianDate}),
      ('turbotax', 'secretturbotax', 'www.turbotax.com', ${julianDate}, ${julianDate}),
      ('ezpass', 'secretezpass', 'www.ezpass.com', ${julianDate}, ${julianDate}),
      ('aa', 'secretaa', 'www.aa.com', ${julianDate}, ${julianDate}),
      ('united', 'secretunited', 'www.united.com', ${julianDate}, ${julianDate}),
      ('github', 'secretgithub', 'www.github.com', ${julianDate}, ${julianDate}),
      ('godaddy', 'secretgodaddy', 'www.godaddy.com', ${julianDate}, ${julianDate}),
      ('nba', 'secretnba', 'www.nba.com', ${julianDate}, ${julianDate}),
      ('espn', 'secretespn', 'www.espn.com', ${julianDate}, ${julianDate}),
      ('redhat', 'secretredhat', 'www.redhat.com', ${julianDate}, ${julianDate}),
      ('blueridge', 'secretblueridge', 'www.blueridge.com', ${julianDate}, ${julianDate}),
      ('cnn', 'secretcnn', 'www.cnn.com', ${julianDate}, ${julianDate}),
      ('amazon', 'secretamazon', 'www.amazon.com', ${julianDate}, ${julianDate}),
      ('wish', 'secretwish', 'www.wish.com', ${julianDate}, ${julianDate})`;
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
    let sql = `UPDATE sites SET sitename = ?, secret = ?, uri = ?, DateModified = ? WHERE siteId = ?`;
    let params = [data.sitename, data.secret, data.uri, julianDate, item.siteId]; //storing user data in an array
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

export const deleteCredentials = async (siteId) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM sites WHERE siteId = ?`;
    let params = [siteId]; //storing user data in an array
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