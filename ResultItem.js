/**
 * Password Manager
 * https://pkutils.com
 *
 * @format
 */

import React from 'react';
import { BackHandler, Pressable, View } from 'react-native';
import { Button, Icon, Text, TextInput, withTheme } from 'react-native-paper';

import uuid from 'react-native-uuid';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import StyledButton from './StyledButton';
import { updateCredentials } from './Database';

function ResultItem({ route, navigation }) {

    const [enc, setEnc] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);
    const [item, setItem] = React.useState({});
    



    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        setValue        
    } = useForm({
        defaultValues: {},
    })

    const onSubmit = data => updateCredentials(item, data).then((result) => {            
        if(result = 1) {
            setEditMode(false);
            setItem(data);
        }
        //TODO error
    });


    const copyToClipboard = async (button) => {        
        await Clipboard.setStringAsync(item.secret);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
        if (!showPassword) { setEnc(uuid.v4().slice(0, 13).toString()); }
        if (showPassword) { setEnc(item.secret); }
    };

    const toggleEditMode = () => {         
        setValue("sitename", item.sitename);
        setValue("secret", item.secret);
        setValue("uri", item.uri);  
        setEditMode(!editMode);
    };

    React.useEffect(function () { }, [item]);
    

    React.useEffect(()=>{
        console.log("bH")
        BackHandler.addEventListener("hardwareBackPress",()=>{
            navigation.navigate('Search', { pop: "POP" })
        //You can add any other statements also 
        return true;
        })
       },[])


    React.useEffect(function () {
        //console.log("SINGLE LOAD");
        setItem(route.params.item); 
        setShowPassword(!showPassword);
        setEnc(uuid.v4().slice(0, 13).toString());


        
        //navigation.push('Search', {post: 'someText'});
        //navigation.setParams({post: 'someText'});


    }, []);
    return (
        <>
            <View style={[styles.row, { justifyContent: 'flex-end', paddingRight: 30, paddingTop: 30 }]}>
                <Pressable onPress={toggleEditMode} >
                    <Icon color="black" source="square-edit-outline" size={30} />
                </Pressable>
            </View>

            {editMode ? (<>
                <View style={{paddingLeft: 30}}>
                    <Text style={{ textAlign:'left', paddingTop: 15, paddingBottom:15, fontSize: 20, fontWeight: 'bold', }}>Edit</Text>
                    <Controller
                        name="sitename"
                        control={control}
                        rules={{ required: true, }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="Name"
                                placeholder={item.sitename}
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value} />
                        )}                        
                    />
                    {errors.sitename && <Text style={{ color: 'red', textAlign: 'right', paddingRight: 40 }}>This is required.</Text>}

                    <Controller
                        name='uri'
                        control={control}
                        rules={{ maxLength: 100, }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label='URL'
                                style={styles.input}
                                placeholder={item.uri}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize='none'
                            />
                        )}
                    />
                    <View style={{ flexDirection: 'row', }}>
                        <Controller
                            name='secret'
                            control={control}
                            rules={{ required: true, minLength: 4, }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    label='Password'
                                    placeholder={item.secret}
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    autoCapitalize='none'
                                    secureTextEntry={showPassword} />
                            )}                            
                        />
                        {/* <Pressable onPress={() => { toggleShowPassword() }} style={styles.pwIcon}>
                            <Icon color="black" source="eye" size={30} />
                        </Pressable> */}
                    </View>
                    {errors.secret && <Text style={{ color: 'red', textAlign: 'right', paddingRight: 40 }}>This is required.</Text>}

                    <View style={{ width: 160, paddingTop: 10, justifyContent: 'center', alignContent: 'center' }}>
                        <Button
                            mode='contained'
                            onPress={handleSubmit(onSubmit)}
                            icon='content-save'
                        >Update</Button>
                    </View>
                </View>
            </>) : null}

            {!editMode ? (<>
                <View style={[styles.row, { justifyContent: 'center' }]}>
                    <Text style={[styles.title, { textTransform: 'uppercase', paddingTop: 15 }]}>{item.sitename}</Text>
                </View>
                <View style={[styles.column, { paddingHorizontal: 50, paddingTop: 20, }]}>
                    <View style={[styles.row, { justifyContent: 'flex-start', alignItems: 'center', borderTopColor: 'silver', borderTopWidth: 0.4 }]}>
                        <Icon color="black" source="link" size={35} />
                        <Text style={[styles.quicksand, { padding: 10, fontSize: 19 }]}>URL: {item.uri}</Text>
                    </View>
                    <View style={[styles.row, { justifyContent: 'flex-start', alignItems: 'center', borderBottomColor: 'silver', borderBottomWidth: 0.4, paddingBottom: 5, marginBottom: 15 }]}>
                        <Icon color="black" source="onepassword" size={30} />
                        <Text style={[styles.quicksand, { padding: 10, fontSize: 19 }]}>Password: {enc}</Text>
                    </View>
                    <Text style={{ padding: 10, lineHeight: 20 }}>The password will only be shown in encrypted format. You can reveal it by pressing on the eye icon or you can copy it to directly to the Clipboard.</Text>
                    <Text style={{ padding: 10, paddingBottom: 30 }}><Text style={{ lineHeight: 20, color: "red" }}>WARNING! </Text>Copying to the Clipboard only hides it from the screen. Password can still be viewed by pasting it.</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <StyledButton icon={"eye"} iconSize={55} buttonText={"reveal"} onPress={() => { toggleShowPassword() }} />
                        <StyledButton icon={"clipboard-multiple-outline"} iconSize={55} buttonText={"CLIPBOARD"} onPress={() => { copyToClipboard(this) }} />
                    </View>
                </View >
            </>) : null}
        </>
    )
};

export default withTheme(ResultItem);