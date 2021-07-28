import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-ionicons';

import Create from '../../pages/Create';
import Home from '../../pages/Home';
import { HStack } from 'native-base';
import Edit from '../../pages/Edit';
import Detail from '../../pages/Detail';

const Stack = createStackNavigator();

function Routes() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              title: 'BekPek',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                  <Icon
                    ios="ios-add"
                    android="md-add"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Create"
            component={Create}
          // options={({navigation}) => ({
          //   headerRight: () => (
          // <HStack>
          //   <TouchableOpacity onPress={() => alert('search')}>
          //     <Icon
          //       ios="ios-search"
          //       android="md-search"
          //       style={{marginRight: 15}}
          //     />
          //   </TouchableOpacity>
          //   <TouchableOpacity onPress={() => alert('created')}>
          //     <Icon
          //       ios="ios-checkmark-circle-outline"
          //       android="md-checkmark-circle-outline"
          //       style={{marginRight: 15, color: 'green'}}
          //     />
          //   </TouchableOpacity>
          // </HStack>
          // ),
          // })}
          />
          <Stack.Screen
            name="Edit"
            component={Edit}
            options={{
              title: 'Edit List'
            }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              title: 'Detail List'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Routes;
