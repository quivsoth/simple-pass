/**
 * Password Manager
 * https://pkutils.com
 *
 * @format
 */

import React from 'react';
import { FlatList, Pressable, View, } from 'react-native';
import { Image } from 'expo-image';
import { Icon, Text, TextInput, withTheme } from 'react-native-paper';
import Svg, { Circle, Rect } from 'react-native-svg';

import * as SQLite from 'expo-sqlite';
import { styles } from './styles';
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*






//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function Search({ navigation }) {

    const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  
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
        <Pressable style={styles.pressable} onPress={onPress} >
            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }]}>
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange', width: 60, height: 60, borderRadius: 200 / 2 }}>


                <Image
        //style={styles.image}
        style={{width: 60, height: 60, borderRadius: 200 / 2}}
        source="https://www.google.com/s2/favicons?domain=www.espn.com.au&sz=256"
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
        height={50}
        width={50}
      />


                    {/* <Text style={[styles.quicksand, { letterSpacing: 1, textTransform: 'uppercase', fontSize: 20 }]}>{item.sitename.slice(0, 2)}</Text> */}
                </View> 

        



                <Text style={[styles.quicksand, { textAlign: "center", textTransform: 'uppercase', }]}>{item.sitename}</Text>
                <Icon color="black" source="chevron-right" size={30} />
            </View>
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