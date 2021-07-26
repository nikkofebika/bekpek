import React, {useEffect, useState} from 'react';
import {FlatList, Text} from 'native-base';
import Card from '../components/molecules/Card';
import {deleteList, getAllList} from '../database/Lists';

const Home = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    getLists();
  }, []);

  const getLists = async () => {
    const res = await getAllList();
    setDatas(res);
  };

  const renderItem = ({item}) => {
    return (
      <Card
        name={item.list_name}
        handleDeleteList={async () => await deleteList(item.id)}
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
