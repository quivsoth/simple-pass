/**
 * Password Manager
 * https://pkutils.com
 *
 * @format
 */

import React, { version } from 'react';
import { styles } from './styles';
import {
    FlatList,
    Pressable,
    SafeAreaView,
    View,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import uuid from 'react-native-uuid';
import * as Clipboard from 'expo-clipboard';
import {
    Icon,
    Modal,
    PaperProvider,
    Portal,
    Text,
    TextInput,
    useTheme,
    withTheme
} from 'react-native-paper';


function Search({ navigation }) {

    const [searchText, setSearchText] = React.useState('');
    const [payload, setPayload] = React.useState([]);
    const [selectedSite, setSelectedSite] = React.useState({});
    const [visible, setVisible] = React.useState(false);
    const [enc, setEnc] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);


    

    const copyToClipboard = async (button) => {
        console.log(button);
        await Clipboard.setStringAsync(selectedSite.secret);
      };


    const toggleShowPassword = () => { 
        setShowPassword(!showPassword);
        if(!showPassword) { setEnc(uuid.v4().slice(0, 13)); }
        if(showPassword) { setEnc(selectedSite.secret); }
    };

    const theme = useTheme();

    async function openDatabase() {
        if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")).exists) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite");
        }
        await FileSystem.downloadAsync(
            Asset.fromModule(require("./assets/database/arcticfox.db")).uri,
            FileSystem.documentDirectory + "SQLite/arcticfox.db"
        );
        return SQLite.openDatabase("arcticfox.db", "1.0");
    }

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedSite(item);
                    showModal();
                }}
            />
        );
    };

    const Item = ({ item, onPress }) => (
        <Pressable style={[styles.pressable]} onPress={onPress} >
            <Text style={{ textAlign: "center", textTransform: 'uppercase' }}>{item.sitename}</Text>
        </Pressable>
    );

    React.useEffect(function () {
        setEnc(uuid.v4().slice(0, 13));
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

    return (
        <>
            <PaperProvider theme={theme}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                        <View style={[styles.column]}>
                            <View style={{ textAlign: "right", alignSelf: "flex-end", justifyContent: "flex-end" }}>
                                <Pressable onPress={() => { hideModal(); }} >
                                    <Icon color="black" source="close" size={25} />
                                </Pressable>
                            </View>
                            <Text style={styles.title}>Site Details</Text>
                            <Text style={{ padding: 10 }}>Name: {selectedSite.sitename}</Text>
                            <Text style={{ padding: 10 }}>URL: {selectedSite.uri}</Text>
                            <Text style={{ padding: 10 }}>Password: {enc}</Text>

                            <Text style={{ padding: 10 }}>The password will only be shown in encrypted format. You can reveal it by pressing on the eye icon or you can copy it to directly to the Clipboard.</Text>
                            <Text style={{ padding: 10 }}><Text style={{ color: "red" }}>Warning : </Text>copying to the Clipboard only hides it from the screen. Password can still be viewed by pasting it.</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Pressable style={[styles.square, { justifyContent: "center", alignItems: 'center' }]}
                                        onPress={() => {
                                            toggleShowPassword()
                                        }}>
                                        <Icon color="black" source="eye" size={55} />
                                    </Pressable>
                                    <Text style={{ justifyContent: "center", alignItems: 'center', textAlign: "center", fontSize: 12 }}>REVEAL</Text>
                                </View>

                                <View style={{ flexDirection: "column" }}>
                                    <Pressable style={[styles.square, { justifyContent: "center", alignItems: 'center' }]}
                                        onPress={ () => {copyToClipboard(this)}}>
                                        <Icon color="black" source="clipboard-multiple-outline" size={55} />
                                    </Pressable>
                                    <Text style={{ justifyContent: "center", alignItems: 'center', textAlign: "center", fontSize: 12 }}>CLIPBOARD</Text>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </Portal>
                <View style={[styles.row, { justifyContent: "center" }]}>
                    <Text style={styles.title}>Search</Text>
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
            </PaperProvider>
        </>
    )
}

export default withTheme(Search);