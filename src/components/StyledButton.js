import * as React from 'react';
import { Pressable, View } from 'react-native';
import { Icon, Text, withTheme } from 'react-native-paper';
import { styles } from '../styles';


const StyledButton = ({ onPress, icon, buttonText, iconSize }) => {
    // React.useEffect(function () { }, []);
    return (
        <View style={[{ flexDirection: "column" }, {width:100, height:100}]}>
            <Pressable style={[styles.square, { justifyContent: "center", alignItems: 'center' }]}
                 onPress={onPress}>
                <Icon color="black" source={icon} size={iconSize} />
            </Pressable>
            <Text style={{ paddingTop:10, justifyContent: "center", alignItems: 'center', textAlign: "center", fontSize: 12, textTransform: 'uppercase' }}>{buttonText}</Text>
        </View>
    )
};


export default withTheme(StyledButton);