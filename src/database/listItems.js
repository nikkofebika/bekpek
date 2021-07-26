import db from '../config/db';

export const createTableListItems = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE list_items (id INTEGER PRIMARY KEY AUTOINCREMENT, list_id INTEGER, item_id INTEGER)`,
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
export const getAllListItems = () => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      fx.executeSql(
        'SELECT * FROM items',
        [],
        (fx, res) => {
          let len = res.rows.length;
          let results = [];
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              const item = res.rows.item(i);
              results.push({id: item.id, name: item.name});
            }
          }
          resolve({success: true, data: results});
        },
        error => {
          console.log('error db getItems', error.message);
          reject(error.message);
        },
      );
    });
  });
};

export const insertListItems = (listId, items) => {
  return new Promise((resolve, reject) => {
    db.transaction(fx => {
      items.map(item => {
        fx.executeSql(
          'INSERT INTO list_items (list_id, item_id) VALUES (?,?)',
          [listId, item],
          (fx, res) => {
            console.log('res insertListItems', res);
            resolve(res);
          },
          error => {
            console.log('error db insertListItems', error.message);
            reject(error.message);
          },
        );
      });
    });
  });
};
