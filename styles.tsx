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
    image : {
        height: 50,
        width: 50,
    },
    input: {
        marginTop: 12,
        marginBottom: 20,
        marginHorizontal: 22,
        paddingHorizontal: 24,
        width: '85%',
        fontSize: 15,
        fontFamily: 'Quicksand',
        textAlign: 'left',
        alignContent: 'center',
        justifyContent: 'center',
    },
    modal: {
        borderColor: 'grey',
        borderStyle: 'solid',
        borderWidth: 1,
        backgroundColor: '#FFF',
        width: '90%',
        height: '90%',
        marginHorizontal: 15,
        padding: 30,
        borderRadius: 10,
        justifyContent: 'flex-start',
        paddingBottom: 32
    },
    pressable: {
        backgroundColor: '#F6F6F6',
        padding: 27,
        marginBottom: 15,
        marginHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'silver',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    pwIcon : { },
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