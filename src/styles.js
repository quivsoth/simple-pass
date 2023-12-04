import { StyleSheet } from 'react-native';
import { Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { useFonts } from 'expo-font';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Quicksand-Regular'
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    footer: {
        backgroundColor: 'purple',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        paddingHorizontal: 40
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },

    image: {
        height: 50,
        width: 50,
    },
    input: {
        marginTop: 12,
        marginBottom: 20,
        //marginHorizontal: 22,
        //paddingHorizontal: 24,
        width: '85%',
        fontSize: 15,
        fontFamily: 'Quicksand',
    },
    pressable: {
        backgroundColor: '#EADFFF',
        padding: 20,
        marginBottom: 5,
        marginHorizontal: 0,
        borderColor: 'silver',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    pwIcon: {},
    square: {
        borderColor: 'rgb(120, 69, 172)',
        borderStyle: 'solid',
        borderWidth: 1,
        backgroundColor: 'rgb(237, 221, 246)',
        width: 100,
        height: 100,
        borderRadius: 10
    },
    quicksand: {
        fontFamily: 'Quicksand'
    },
    title: {
        marginTop: 12,
        marginBottom: 20,
        paddingHorizontal: 24,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default styles;