/**
 * Password Manager
 * https://pkutils.com
 *
 * @format
 */

import React from 'react';
import { FlatList, Pressable, View, } from 'react-native';
import { Text, TextInput, withTheme } from 'react-native-paper';

import * as SQLite from 'expo-sqlite';
import { styles } from './styles';
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*





//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function Search({ navigation }) {

    const [searchText, setSearchText] = React.useState('');
    const [payload, setPayload] = React.useState([]);


    async function openDatabase() {
        return SQLite.openDatabase("arcticfox.db", "1.0");
    }

     
    const renderItem = ({ item }) => {
        return (                
            <Item item={item} onPress={() => { navigation.navigate('ResultItem', { item }) }} />
        );
    };

    const Item = ({ item, onPress }) => (
        <Pressable style={[styles.pressable]} onPress={onPress} >
            <Text style={[styles.quicksand, { textAlign: "center", textTransform: 'uppercase' }]}>{item.sitename}</Text>
        </Pressable>
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

    

    React.useCallback(() => {
        console.log("searchText")
        console.log(searchText)

      }, [searchText]);


    return (
        <>
            <View style={[styles.row, { justifyContent: "center" }]}>
                <Text style={[styles.title, {paddingTop: 20}]}>Simple Pass</Text>                
            </View> 
            <View style={[styles.row, { justifyContent: "center" }]}>
                <TextInput
                    style={styles.input}
                    placeholder='search for site..'
                    onChangeText={text => setSearchText(text.toLowerCase())}
                    value={searchText}
                />
            </View>
            <FlatList
                data={payload.filter((data) => data.sitename.includes(searchText.toLowerCase()))}
                renderItem={renderItem}
            />                                    
        </>
    )
}

export default withTheme(Search);