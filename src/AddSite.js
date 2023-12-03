import React from "react"
import { Image, Pressable, View, } from "react-native"
import { Button, Icon, Text, TextInput, useTheme, withTheme } from 'react-native-paper';
import { useForm, Controller, SubmitHandler } from "react-hook-form";


import * as SQLite from 'expo-sqlite';
import styles from './styles';
//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

const ERROR_MESSAGES = {
    REQUIRED: "Required",
    NAME_INVALID: "Not a Valid Name",
}




//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
function AddSite({ navigation }) {

    const theme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);
    const [isSubmit, setIsSubmit] = React.useState(false);

    const toggleShowPassword = () => { setShowPassword(!showPassword); };
    const openDb = async() => {  return SQLite.openDatabase("arcticfox.db", "1.0");  }
    const onSubmit = data => AddCredentials(data)

    const AddCredentials = async (data) => {
        console.log(data);
        openDb().then((db) => {
            let sql = "INSERT INTO sites (sitename, secret, uri) VALUES (?, ?, ?)";
            let params = [data.sitename, data.secret, data.uri]; //storing user data in an array
            db.transaction((tx) => {
                tx.executeSql(
                    sql,
                    params,
                    (tx, resultSet) => {
                        console.log("Status : ", resultSet);
                        console.log("Success", "Credentials created successfully.");
                        setIsSubmit(true);
                    }, (error) => {
                        console.log( "\u001b[1;31m Red message" );

                        console.log("\x1b[41m", "DATABASE ERROR", '\x1b[0m');
                        
                    }
                )
            });
        });        
    }


    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        defaultValues: {
            sitename: "",
            uri: "",
            secret: "",
        },
    })

    const startAgain = () => { setIsSubmit(false); }

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            control._reset();
        }
    },);

    return (
        <>
            <View style={[styles.row, { justifyContent: 'center' }]}>
                <Text style={styles.title}>New Credentials</Text>
            </View>
            {isSubmit ? (
                <View style={[styles.container, { paddingHorizontal: 30, alignItems:"center" }]}>

                    {/* <View> */}
                    <Image style={styles.image} source={require('../assets/images/checkmark.png')} />
                    <Text style={{marginBottom: 20}}>Your new credentials have been added! Would you like to add another credential?</Text>

                    <Button
                        mode="contained"
                        onPress={startAgain}
                        style={[styles.button, {width:200}]}
                        icon="rename-box">
                        New Credential
                    </Button>
                </View>

            ) : null}

            {!isSubmit ? (
                <>
                    <View>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label="Name"
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="sitename"
                        />
                        {errors.sitename && <Text style={{ color: 'red', textAlign: 'right', paddingRight: 40 }}>This is required.</Text>}

                        <Controller
                            control={control}
                            rules={{
                                maxLength: 100,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label='URL'
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    autoCapitalize='none'
                                />
                            )}
                            name='uri'
                        />
                        <View style={{ flexDirection: 'row', }}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    minLength: 4,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label='Password'
                                        style={styles.input}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        autoCapitalize='none'
                                        secureTextEntry={showPassword}
                                    >

                                    </TextInput>
                                )}
                                name='secret'
                            />
                            <Pressable onPress={() => { toggleShowPassword() }} style={styles.pwIcon}>
                                <Icon color="black" source="eye" size={30} />
                            </Pressable>
                        </View>
                        {errors.secret && <Text style={{ color: 'red', textAlign: 'right', paddingRight: 40 }}>This is required.</Text>}

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                            <Button
                                mode='contained'
                                onPress={handleSubmit(onSubmit)}
                                style={[styles.button, { marginTop: 15, width: 250, alignItems: 'center' }]}
                                icon='rename-box'
                            >Create Credential</Button>
                        </View>
                    </View>
                </>
            ) : null}
        </>
    );
}

export default withTheme(AddSite);