/**
 * Password Manager
 * https://pkutils.com
 *
 * @format
 */

import React from 'react';
import { BackHandler, FlatList, Pressable, View, } from 'react-native';
import { Image } from 'expo-image';
import { Icon, Text, TextInput, withTheme } from 'react-native-paper';
import { getSites } from './Database';
import { styles } from './styles';
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*






//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function Search({ navigation, route }) {

    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    const [searchText, setSearchText] = React.useState('');
    const [hasText, setHasText] = React.useState(false);
    const [payload, setPayload] = React.useState([]);
    
    const renderItem = ({ item }) => {
        return (
            <Item item={item} onPress={() => { navigation.navigate('ResultItem', { item }) }} />
        );
    };

    const Item = ({ item, onPress }) => (
        <Pressable style={styles.pressable} onPress={onPress} >
            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }]}>
                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: 50, height: 50, borderRadius: 200 / 2 }}>
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 200 / 2, borderColor: 'silver', borderWidth: 1 }}
                        source={`https://www.google.com/s2/favicons?domain=${item.uri}&sz=256`}
                        placeholder={blurhash}
                        contentFit="cover"
                        transition={1000}
                    />
                    {/* <Text style={[styles.quicksand, { letterSpacing: 1, textTransform: 'uppercase', fontSize: 20 }]}>{item.sitename.slice(0, 2)}</Text> */}
                </View>
                <Text style={[styles.quicksand, { textAlign: 'left', textTransform: 'uppercase', fontSize: 18 }]}>{item.sitename}</Text>
                <Icon color="black" source="chevron-right" size={30} />
            </View>
        </Pressable>
    );


    // React.useEffect(function () {
    //     // console.log('oneData::: ', oneData);                
    // }, [oneData]);



    React.useEffect(function () {
        getSites().then((result) => setPayload(result));
        console.log('route.params::: ', route.params);
    }, []);

    React.useEffect(function () {
        if (searchText.length > 0) setHasText(true);
        if (searchText.length == 0) setHasText(false);
        console.log('route::: ', route);
  
        // console.log('oneData::: ', oneData);
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