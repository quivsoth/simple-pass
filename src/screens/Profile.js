import * as React from 'react';
import { View, } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

import { styles } from '../styles';

function Profile({ navigation }) {
  return (
    <>
      <View style={[styles.row, { justifyContent: "center" }]}>
        <Text style={[styles.title, { paddingTop: 20 }]}>NAME HERE</Text>
      </View>
    </>
  )
}

export default withTheme(Profile);