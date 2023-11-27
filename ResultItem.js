/**
 * Password Manager
 * https://pkutils.com
 *
 * @format
 */

import React from 'react';
import { View} from 'react-native';
import { Text, useTheme, withTheme } from 'react-native-paper';

import * as SQLite from 'expo-sqlite';
import * as Clipboard from 'expo-clipboard';
import uuid from 'react-native-uuid';

import { styles } from './styles';
import StyledButton from './StyledButton';

function ResultItem({ route, navigation }) {

    const [enc, setEnc] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const item = route.params.item;
    const theme = useTheme();

    const copyToClipboard = async (button) => {
        console.log(button);
        await Clipboard.setStringAsync(selectedSite.secret);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
        if (!showPassword) { setEnc(uuid.v4().slice(0, 13)); }
        if (showPassword) { setEnc(selectedSite.secret); }
    };

    React.useEffect(function () {
        setShowPassword(!showPassword);
        setEnc(uuid.v4().slice(0, 13));        
    }, []);

    return (
        <>
            <View style={[styles.row, { justifyContent: "center" }]}>
                <Text style={styles.title}>{item.sitename}</Text>
            </View>
            <View style={[styles.column]}>                
                {/* <Text style={styles.title}>Site Details</Text>
                <Text style={{ padding: 10 }}>Name: {item.sitename}</Text> */}
                <Text style={{ padding: 10 }}>URL: {item.uri}</Text>
                <Text style={{ padding: 10 }}>Password: {enc}</Text>

                <Text style={{ padding: 10 }}>The password will only be shown in encrypted format. You can reveal it by pressing on the eye icon or you can copy it to directly to the Clipboard.</Text>
                <Text style={{ padding: 10 }}><Text style={{ color: "red" }}>Warning : </Text>copying to the Clipboard only hides it from the screen. Password can still be viewed by pasting it.</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <StyledButton icon={"eye"} iconSize={55} buttonText={"reveal"} onPress={() => { toggleShowPassword() }} />
                    <StyledButton icon={"clipboard-multiple-outline"} iconSize={55} buttonText={"CLIPBOARD"} onPress={() => { copyToClipboard(this) }} />
                </View>
            </View>
        </>
    )
};

export default withTheme(ResultItem);