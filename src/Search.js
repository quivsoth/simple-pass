/**
 * Password Manager
 * https://pkutils.com
 *
 * @format
 */

import React from 'react';
import { FlatList, Pressable, View, } from 'react-native';
import { Icon,Text, TextInput, withTheme } from 'react-native-paper';

import { shallow } from 'zustand/shallow';

import { useReset, useStore } from "./store";
import { getSites } from './data/Database';

import { styles } from './styles';
import SearchResultItem from './components/SearchResultItem';
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*






//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function Search({ navigation, route }) {

    const { resultItems, addItem } = useStore(({ addItem, resultItems }) => ({
        resultItems,
        addItem,
    }),
        shallow
    );

    const [searchText, setSearchText] = React.useState('');
    const [hasText, setHasText] = React.useState(false);

    const renderItem = ({ item }) => {
        return (
            <SearchResultItem item={item} onPress={() => { navigation.navigate('ResultItem', { item }) }} />
        );
    };


    React.useEffect(function () {
        getSites().then(result => result.map(item => addItem(item)))
    }, []);

    React.useEffect(function () {
        if (searchText.length > 0) setHasText(true);
        if (searchText.length == 0) setHasText(false);
    }, [searchText]);

    return (
        <>
            <View style={[styles.row, { justifyContent: 'flex-end', paddingRight: 30, paddingTop: 30 }]}>
                <Pressable onPress={() => navigation.navigate('AddSite')} >
                    <Icon color="black" source="plus" size={30} />
                </Pressable>
            </View>
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
                    data={resultItems.filter((data) => data.sitename.includes(searchText.toLowerCase()))}
                    renderItem={renderItem}
                />
            ) : null}
        </>
    )
}
export default withTheme(Search);
