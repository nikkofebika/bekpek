import db from "../config/db";

export const insertList = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO lists (name) VALUES (?)`,
        [name],
        (sqlTx, res) => {
          console.log('res', res);
          console.log(`${name} added successfully`);
          showLists();
          resolve({ success: true })
        },
        error => {
          console.log('error db insert list', error.message);
          reject(error.message);
        },
      );
    });
  })
}
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE lists (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50))`,
      [],
      (sqlTx, res) => {
        console.log('success create table');
        console.log('res', res);
        console.log('sqlTx', sqlTx);
      },
      error => {
        console.log('error create table');
        console.log('error', error.message);
      },
    );
  });
};
export const deleteData = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM lists WHERE id=?`,
        [id],
        (sqlTx, res) => {
          showLists();
          resolve();
        },
        error => {
          console.log('error db delete list');
          reject(error.message);
        },
      );
    });
  });
};
export const showLists = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      //   tx.executeSql('INSERT INTO lists (name) VALUES ("bantal")');
      tx.executeSql(
        `SELECT * FROM lists ORDER BY id DESC`,
        [],
        (sqlTx, res) => {
          let len = res.rows.length;
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              const item = res.rows.item(i);
              results.push({ id: item.id, name: item.name });
            }
            // console.log('results', results);
            resolve(results);
          }
        },
        error => {
          console.log('error db showLists', error.message);
          reject(error.message);
        },
      );
    });
  });
};
