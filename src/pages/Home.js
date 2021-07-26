import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import Card from '../components/molecules/Card';
import { deleteData, showLists } from '../database/Lists';

const db = openDatabase({
  name: 'bekpek',
  location: 'default',
});

const Home = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    getLists();
  }, [datas]);

  const getLists = async () => {
    // await showLists()
    //   .then(res => setDatas(res))
    //   .catch(error => console.log('error getLists', error));
    const res = await showLists();
    setDatas(res);
  };

  const renderItem = ({ item }) => {
    return (
      <Card
        name={item.name}
        handleDeleteList={async () => await deleteData(item.id)}
      />
    );
  };

  if (datas.length > 0) {
    return (
      <FlatList
        data={datas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        mx={3}
      />
    );
  }
  return <Text>No Data</Text>;
};

export default Home;
