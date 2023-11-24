
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withTheme } from 'react-native-paper';

import FrontPage from './FrontPage';
import Search from './Search';
import AddSite from './AddSite';

// async function load() {
//   if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")).exists) {
//       await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
//   }
//   await FileSystem.downloadAsync(
//       Asset.fromModule(require("./assets/database/arcticfox.db")).uri,
//       FileSystem.documentDirectory + "SQLite/arcticfox.db"
//   );
// }

// load();

const Stack = createNativeStackNavigator();

function App() {  
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={FrontPage} options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#4d089a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="Search" component={Search} options={{
          title: 'Search',
          headerStyle: {
            backgroundColor: '#4d089a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="AddSite" component={AddSite} options={{
          title: 'Add Site',
          headerStyle: {
            backgroundColor: '#4d089a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default withTheme(App);