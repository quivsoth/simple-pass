import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Icon, Text, withTheme } from 'react-native-paper';
import { styles } from '../styles';
import { Image } from 'expo-image';

const SearchResultItem = ({ item, onPress }) => {

    const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


    
    return (
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
    )
}


export default withTheme(SearchResultItem);