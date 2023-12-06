/**
 * Password Manager
 * https://pkutils.com
 *
 * @format
 */

import React from 'react';
import { FlatList, View, } from 'react-native';
import { Text, TextInput, withTheme } from 'react-native-paper';

import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

import { styles } from '../styles';
import SearchResultItem from '../components/SearchResultItem';
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*






//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function Search({ navigation, route }) {

    const { resultItems } = useStore(({ resultItems }) => ({resultItems,}),shallow);
    const [searchText, setSearchText] = React.useState('');
    const [hasText, setHasText] = React.useState(false);

    const renderItem = ({ item }) => {
        return (
            <SearchResultItem item={item} onPress={() => { navigation.navigate('ResultItem', { item }) }} />
        );
    };

    React.useEffect(function () {
        if (searchText.length > 0) setHasText(true);
        if (searchText.length == 0) setHasText(false);
    }, [searchText]);

    return (
        <>
            <View style={[styles.row, { justifyContent: "center" }]}>
                <Text style={[styles.title, styles.quicksand, { paddingTop: 20 }]}>Simple Pass</Text>
            </View>
            <View style={[styles.row, { justifyContent: "center", }]}>
                <TextInput
                    style={styles.input}
                    placeholder='search for site..'
                    onChangeText={text => setSearchText(text.toLowerCase())}
                    value={searchText}
                />
            </View>
            <FlatList
                    data={resultItems.filter((data) => data.sitename.includes(searchText.toLowerCase()))}
                    renderItem={renderItem}
                />
            {/* {hasText ? (  ) : null} */}
        </>
    )
}
export default withTheme(Search);
