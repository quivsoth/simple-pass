import * as React from 'react';
import { View, } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

import { styles } from '../styles';
function Settings({ navigation }) {
    return (
        <>
               <View style={[styles.row, { justifyContent: "center" }]}>
                <Text style={[styles.title, { paddingTop: 20 }]}>Prefs</Text>
            </View>
        </>
    )
}

export default withTheme(Settings);