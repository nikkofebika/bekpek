import React from 'react';
import { Alert } from 'react-native';
import { Text, View, Box, HStack } from 'native-base';
import Icon from '../atoms/Icon';
const Card = ({ name, handleDeleteList }) => {
  return (
    <View my={2}>
      <Box bg="gray.50" borderTopRadius="lg" px={3}>
        <Text bold fontSize="lg" py={1}>
          {name}
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
              Alert.alert('Hapus', 'Hapus ' + name, [
                {
                  text: 'Batal',
                },
                { text: 'OK', onPress: handleDeleteList },
              ])
            }
          />
        </HStack>
      </HStack>
    </View>
  );
};
export default Card;
