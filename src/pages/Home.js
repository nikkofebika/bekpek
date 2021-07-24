import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, TouchableOpacity} from 'react-native';
import {Text, View, Box, HStack} from 'native-base';
import Icon from '../components/atoms/Icon';

const Card = () => {
  return (
    <View mx={3} my={2}>
      <Box bg="gray.50" borderTopRadius="lg" px={3}>
        <Text bold fontSize="lg" py={1}>
          Extra Small
        </Text>
        <Text py={2}>
          Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi
        </Text>
      </Box>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        bg="blue.300"
        borderBottomRadius="lg"
        px={3}
        py={1}>
        <Text fontSize="sm">Sen, 27 Feb 2021</Text>
        <HStack space={3}>
          <Icon name="create" />
          <Icon
            name="trash"
            onPress={() =>
              Alert.alert('Alert Title', 'My Alert Msg', [
                {
                  text: 'Canceeleee',
                  onPress: () => alert('cancle'),
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ])
            }
          />
        </HStack>
      </HStack>
    </View>
  );
};

const Home = () => {
  const [datas, setDatas] = useState([]);
  if (datas.length > 0) {
    return (
      <ScrollView>
        {datas.map(i => {
          return <Card key={i.id} />;
        })}
      </ScrollView>
    );
  }
  return <Text>No Data</Text>;
};

export default Home;
