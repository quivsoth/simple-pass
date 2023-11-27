import * as React from 'react';

import { Text, withTheme } from 'react-native-paper';
import { View } from 'react-native';

import StyledButton from './StyledButton';
import { styles } from './styles';

function FrontPage({ navigation }) {
    return (
        <>
            <View style={styles.container}>
                <View style={[styles.row, { justifyContent: "center" }]}>
                    <Text style={[styles.title, styles.quicksand]}>Simple Password Manager</Text>
                </View>
                <View style={[styles.row, { justifyContent: "space-evenly", marginTop: 15 }]}>
                    <StyledButton icon={"plus"} iconSize={55} buttonText={"New"} onPress={() => navigation.navigate('AddSite')} />
                    <StyledButton icon={"magnify"} iconSize={55} buttonText={"Search"} onPress={() => navigation.navigate('Search')} />
                    <StyledButton icon={"cog"} iconSize={55} buttonText={"Settings"} onPress={() => navigation.navigate('')} />
                </View>
            </View>            
        </>
    )
}

export default withTheme(FrontPage);