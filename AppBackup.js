import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'bekpek', location: 'default'});

const App = () => {
  const [inputText, setInputText] = useState('');
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    createTable();
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
          console.log('error', error);
        },
      );
    });
  };

  const droptable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `DROP TABLE lists`,
        [],
        (sqlTx, res) => {
          console.log('delete res', res);
        },
        error => {
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
          console.log('res', res);
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

  const submitForm = () => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO lists (name) VALUES (?)`,
        [inputText],
        (sqlTx, res) => {
          console.log('res', res);
          console.log(`${inputText} added successfully`);
          showLists();
        },
        error => {
          console.log('error', error.message);
        },
      );
    });
  };
  return (
    <View>
      <Text>{inputText}</Text>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="submit" onPress={submitForm} />
      <FlatList
        data={datas}
        renderItem={({item}) => {
          return (
            <Text key={item.id}>
              {item.id} - {item.name}
            </Text>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
export default App;
