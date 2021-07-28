import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    Box,
    Checkbox,
    Divider,
    FlatList,
    FormControl,
    HStack,
    Switch,
    Text,
    VStack,
} from 'native-base';
import { getAllItems } from '../database/Items';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-ionicons';
import { updateList } from '../database/Lists';
import { getListItemByListId, updateListItems } from '../database/listItems';

const Detail = ({ route, navigation }) => {
    const { listId, list_name } = route.params;

    const [dataItems, setDataItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={submitForm}>
                    <Icon
                        ios="ios-checkmark-circle-outline"
                        android="md-checkmark-circle-outline"
                        style={{ marginRight: 15, color: 'green' }}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation, selectedItems]);

    useEffect(() => {
        fetchMyItems();
        fetchItems();
    }, []);

    const fetchMyItems = async () => {
        const res = await getListItemByListId(listId);
        if (res.success) {
            let items = [];
            res.data.map(i => {
                items.push(i.item_id)
            })
            console.log('selected items', items)
            setSelectedItems(items)
        } else {
            console.log('error fetch myitems', res.msg);
        }
    };

    const fetchItems = async () => {
        const res = await getAllItems();
        if (res.success) {
            setDataItems(res.data);
        } else {
            console.log('error fetch items', res.msg);
        }
    };

    const submitForm = async () => {
        console.log('listName', listName)
        console.log('selectedItems', selectedItems)
        const saveListName = await updateList({ id: listId, name: listName });
        if (saveListName.success) {
            await updateListItems(listId, selectedItems);
            navigation.popToTop();
        }
    };
    return (
        <VStack flex={1} bg="white" >
            <Box bg="white" p={2} mx={3} my={2} shadow={2}>
                <Text bold>{list_name} <Text fontSize="xs" italic> Rab, 28 Jul 2021</Text></Text>
                <Divider my={2} />
                <Text fontSize="xs">Total barang yang sudah kembali ada 0 dari 4 barang</Text>
            </Box>
            <FlatList
                mt={2}
                width="100%"
                data={dataItems}
                renderItem={({ item }) => {
                    return (
                        <>
                            <HStack justifyContent="space-between" px={2}>
                                <Text value={item.id} my={2}>
                                    {item.name}
                                </Text>
                                <Switch isChecked={true} />
                            </HStack>
                            <Divider my={1} />
                        </>
                    );
                }}
            />
        </VStack>
    );
};

export default Detail;