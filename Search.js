/**
 * Password Manager
 * https://pkutils.com
 *
 * @format
 */

import React from 'react';
import { FlatList, Pressable, View, } from 'react-native';
import { Text, TextInput, withTheme } from 'react-native-paper';
import Svg, { Circle, Rect } from 'react-native-svg';

import * as SQLite from 'expo-sqlite';
import { styles } from './styles';
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*






//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function Search({ navigation }) {

    const [searchText, setSearchText] = React.useState('');
    const [hasText, setHasText] = React.useState(false);
    const [payload, setPayload] = React.useState([]);

    async function openDatabase() { return SQLite.openDatabase("arcticfox.db", "1.0"); }

    const renderItem = ({ item }) => {
        return (
            <Item item={item} onPress={() => { navigation.navigate('ResultItem', { item }) }} />
        );
    };

    const Item = ({ item, onPress }) => (
        <View style={[{flex: 'row', alignItems: 'stretch', justifyContent: 'center'}]}>
        <Pressable style={styles.pressable} onPress={onPress} >
            <View style={{alignSelf: 'flex-start', backgroundColor: '#FF0', width: 60, height: 60, borderRadius: 200 / 2 }}>
                <Text style={[styles.text, ]}>GO</Text>
            </View>

            <View style={{alignSelf: 'flex-end', backgroundColor: '#FF0'}}>
                <Text style={[styles.quicksand, { alignSelf: 'center', justifyContent: 'center', textAlign: "center", textTransform: 'uppercase',  }]}>{item.sitename}</Text>
            </View>

        </Pressable>
        </View>
    );

    React.useEffect(function () {
        openDatabase().then((db) => {
            const result = [];
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM sites",
                    [],
                    (tx, resultSet) => {
                        var length = resultSet.rows.length;
                        for (var i = 0; i < length; i++) { result.push(resultSet.rows.item(i)); }
                        setPayload(result);
                    }, (error) => {
                        console.log("\u001b[1;31m DATABASE ERROR", "\x1b[30m", error);
                    }
                )
            });
        });
    }, []);

    React.useEffect(function () {
        if (searchText.length > 0) setHasText(true);
        if (searchText.length == 0) setHasText(false);
    }, [searchText]);

    return (
        <>
            <View style={[styles.row, { justifyContent: "center" }]}>
                <Text style={[styles.title, { paddingTop: 20 }]}>Simple Pass</Text>
            </View>
            <View style={[styles.row, { justifyContent: "center" }]}>
                <TextInput
                    style={styles.input}
                    placeholder='search for site..'
                    onChangeText={text => setSearchText(text.toLowerCase())}
                    value={searchText}
                />
            </View>
       

            {hasText ? (
                <FlatList
                    data={payload.filter((data) => data.sitename.includes(searchText.toLowerCase()))}
                    renderItem={renderItem} />
            ) : null}

            


        </>
    )
}

export default withTheme(Search);