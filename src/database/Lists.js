import db from '../config/db';

export const insertList = name => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO lists (name) VALUES (?)`,
        [name],
        (sqlTx, res) => {
          console.log('res', res);
          console.log(`${name} added successfully`);
          getAllList();
          resolve({ success: true, data: res });
        },
        error => {
          console.log('error db insert list', error.message);
          reject(error.message);
        },
      );
    });
  });
};
export const createTableList = () => {
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
export const deleteList = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM lists WHERE id=?`,
        [id],
        (sqlTx, res) => {
          getAllList();
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
export const getAllList = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      //   tx.executeSql('INSERT INTO lists (name) VALUES ("bantal")');
      tx.executeSql(
        `SELECT lists.id, lists.name as list_name, items.name as item_name FROM lists JOIN list_items li ON li.list_id=lists.id JOIN items ON items.id=li.item_id ORDER BY lists.id DESC`,
        [],
        (sqlTx, res) => {
          let len = res.rows.length;
          if (len > 0) {
            let results = [];
            let test = [];
            for (let i = 0; i < len; i++) {
              const item = res.rows.item(i);
              console.log('item', item);
              // results = [{list_name: item.list_name}];
              test[item.id] = {
                id: item.id,
                list_name: item.list_name,
              }
              test[item.id]['items'] = [item.item_name];
              // results.push(test);
              //   results[item.id].push({list_name: item.list_name, name: item.name});
              //   result = cars.reduce(function (r, a) {
              //     r[a.make] = r[a.make] || [];
              //     r[a.make].push(a);
              //     return r;
              // }, Object.create(null));
            }
            console.log('test', test);
            // console.log('results', results);
            resolve(results);
          }
        },
        error => {
          console.log('error db getAllList', error.message);
          reject(error.message);
        },
      );
    });
  });
};
