import {NativeBaseProvider} from 'native-base';
import React from 'react';
import Routes from './src/config/routes';

const App = () => {
  return (
    <NativeBaseProvider>
      <Routes />
    </NativeBaseProvider>
  );
};

export default App;
