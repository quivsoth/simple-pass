import React from "react"
import { Image, SafeAreaView, ScrollView, View, } from "react-native"
import { Button, HelperText, Text, TextInput, useTheme, withTheme } from 'react-native-paper';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import * as SQLite from 'expo-sqlite';
import styles from './styles';



const ERROR_MESSAGES = {
    REQUIRED: "Required",
    NAME_INVALID: "Not a Valid Name",
}

function AddSite({ navigation }) {

    const theme = useTheme();

    const [showPassword, setShowPassword] = React.useState(false);
    const [isSubmit, setIsSubmit] = React.useState(false);

    const toggleShowPassword = () => { setShowPassword(!showPassword); };
    const onSubmit = data => console.log(data);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            sitename: "",
            uri: "",
            secret: "",
        },
    })

    const startAgain = () => { setIsSubmit(false); }

    React.useEffect(function () {
        //setEnc(uuid.v4().slice(0, 13));

    }, []);

    return (
        <>
            <View style={[styles.row, { justifyContent: "center" }]}>
                <Text style={styles.title}>New Credentials</Text>
            </View>
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
                {errors.sitename && <Text style={{ color: "red", textAlign: 'right', paddingRight: 40 }}>This is required.</Text>}

                <Controller
                    control={control}
                    rules={{
                        maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label="URL"
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="url"
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                        minLength: 4,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label="Password"
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="secret"
                />
                {errors.secret && <Text style={{ color: "red", textAlign: 'right', paddingRight: 40 }}>This is required.</Text>}

                <View style={{ flexDirection: "row",justifyContent:"center", alignContent:"center"}}>
                    <Button
                        mode="contained"
                        onPress={handleSubmit(onSubmit)}
                        style={[styles.button, { marginTop: 15, width: 250, alignItems: "center" }]}
                        icon="rename-box"
                    >
                        Create Credential
                    </Button>
                </View>

            </View>
        </>
    );
}

export default withTheme(AddSite);