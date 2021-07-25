import React, {useEffect, useState} from 'react';
import {FlatList} from 'native-base';
import {openDatabase} from 'react-native-sqlite-storage';
import Card from '../components/molecules/Card';

const db = openDatabase({
  name: 'bekpek',
  location: 'default',
});

const Home = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    showLists();
  }, []);

  const createTable = () => {
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
  const deleteData = id => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM lists WHERE id=?`,
        [id],
        (sqlTx, res) => {
          console.log('success delete list');
          console.log('res', res);
          console.log('sqlTx', sqlTx);
          showLists();
        },
        error => {
          console.log('error delete list');
          console.log('error', error.message);
        },
      );
    });
  };
  const showLists = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM lists ORDER BY id DESC`,
        [],
        (sqlTx, res) => {
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              const item = res.rows.item(i);
              results.push({id: item.id, name: item.name});
            }
            console.log('results', results);
            setDatas(results);
          }
        },
        error => {
          console.log('error', error.message);
        },
      );
    });
  };

  const renderItem = ({item}) => {
    return (
      <Card name={item.name} handleDeleteList={() => deleteData(item.id)} />
    );
  };

  if (datas.length > 0) {
    return (
      <FlatList
        data={datas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    );
  }
  return <Text>No Data</Text>;
};

export default Home;
