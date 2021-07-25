import React from 'react';
import {FormControl, Input, Stack, VStack} from 'native-base';

const Create = () => {
  return (
    <VStack mx={4}>
      <FormControl isRequired>
        <FormControl.Label>Nama </FormControl.Label>
        <Input p={2} placeholder="Nama List" />
      </FormControl>
    </VStack>
  );
};

export default Create;
