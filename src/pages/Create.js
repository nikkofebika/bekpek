import React, { useState } from 'react';
import { Button, FormControl, Input, Text, VStack } from 'native-base';
import { insertList } from '../database/Lists';

const Create = () => {
  const [listName, setListName] = useState("");
  const submitForm = async () => {
    const res = await insertList(listName);
    if (res.success) {
      alert('berhasil input ' + listName);
    }
  };
  return (
    <VStack mx={3} my={2}>
      <FormControl isRequired>
        <Input p={2} placeholder="Nama List" onChangeText={setListName} />
      </FormControl>
      <Button onPress={submitForm} mt={5} colorScheme="cyan">
        Submit
      </Button>
    </VStack>
  );
};

export default Create;
