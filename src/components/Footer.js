
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Icon, withTheme } from 'react-native-paper';

import Search from '../Search';
import AddSite from '../AddSite';
import ResultItem from '../ResultItem';
import { styles } from '../styles';


const Footer = (clickOne) => {
    return (
        <View style={styles.footer}>
            <Pressable onPress={clickOne} >
                <Icon color="black" source="home" size={30} />
            </Pressable>
            
            <Pressable onPress={console.log("PRESSED")} >
                <Icon color="black" source="magnify" size={30} />
            </Pressable>

            <Pressable onPress={console.log("PRESSED")} >
                <Icon color="black" source="plus" size={30} />
            </Pressable>
            <Pressable onPress={console.log("PRESSED")} >
                <Icon color="black" source="account" size={30} />
            </Pressable>
            <Pressable onPress={console.log("PRESSED")} >
                <Icon color="black" source="cog-outline" size={30} />
            </Pressable>


        </View>
    )
}

export default withTheme(Footer);