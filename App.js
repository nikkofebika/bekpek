import React from 'react'
import 'react-native-gesture-handler';
import Routes from './src/config/routes'
import { NativeBaseProvider } from 'native-base';
const App = () => {
  return (
    <NativeBaseProvider>
      <Routes />
    </NativeBaseProvider>
  )
}

export default App
