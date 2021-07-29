import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'native-base';
import Card from '../components/molecules/Card';
import {
  createTableList,
  deleteList,
  dropTableLists,
  getAllList,
} from '../database/Lists';
import {
  createTableListItems,
  dropTableListItems,
  getAllListItems,
} from '../database/listItems';
import { createTableItems, dropTableItems, insertAll } from '../database/Items';

const Home = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    // dropTableItems();
    // dropTableListItems();
    // dropTableLists();
    // dropTableListItems();
    // createTableListItems();
    // createTableList();
    // createTableItems();
    // console.log('tai');
    // insertAll();
    // getAllListItems();
    getLists();
  }, []);

  const getLists = async () => {
    const res = await getAllList();
    console.log('resku', res);
    setDatas(res);
  };

  const handleDeleteList = async itemId => {
    const del = await deleteList(itemId);
    del.success && getLists();
  };

  const renderItem = ({ item }) => {
    return (
      <Card data={item} handleDeleteList={() => handleDeleteList(item.id)} />
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
