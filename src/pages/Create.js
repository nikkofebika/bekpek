import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  Box,
  Button,
  Checkbox,
  FlatList,
  Flex,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
} from 'native-base';
import {getAllItems} from '../database/Items';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-ionicons';
import {insertList} from '../database/Lists';
import {insertListItems} from '../database/listItems';

const Create = ({navigation}) => {
  const [listName, setListName] = useState('');
  const [dataItems, setDataItems] = useState([]);
  const [groupValues, setGroupValues] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack>
          <TouchableOpacity onPress={() => alert('search')}>
            <Icon
              ios="ios-search"
              android="md-search"
              style={{marginRight: 15}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={submitForm}>
            <Icon
              ios="ios-checkmark-circle-outline"
              android="md-checkmark-circle-outline"
              style={{marginRight: 15, color: 'green'}}
            />
          </TouchableOpacity>
        </HStack>
      ),
    });
  }, [navigation, listName, groupValues]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await getAllItems();
    if (res.success) {
      console.log('res items', res.data);
      setDataItems(res.data);
    } else {
      console.log('error fetch items', res.msg);
    }
  };

  const submitForm = async () => {
    const saveListName = await insertList(listName);
    if (saveListName.success) {
      await insertListItems(saveListName.data.insertId, groupValues);
      navigation.popToTop();
    }
  };
  return (
    <VStack mx={3} my={2}>
      <Text>{listName}</Text>
      <FormControl isRequired>
        <Input
          p={2}
          placeholder="Nama List"
          value={listName}
          onChangeText={setListName}
        />
      </FormControl>
      <Checkbox.Group
        width="100%"
        onChange={setGroupValues}
        value={groupValues}>
        <FlatList
          width="100%"
          bg="primary.300"
          data={dataItems}
          renderItem={({item}) => {
            return (
              <Checkbox value={item.id} my={2}>
                {item.name}
              </Checkbox>
            );
          }}
        />
      </Checkbox.Group>
      <Button onPress={submitForm}>submitForm</Button>
    </VStack>
  );
};

export default Create;
