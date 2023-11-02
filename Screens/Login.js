import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core'
import { collection, doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Slices/SliceUsers';
import { setUserInfo } from '../Slices/dataSlice';
import { BlurView } from 'react-native-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {

    const navigation = useNavigation()

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState('')



    const handleLogin = async () => {

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigation.navigate("TabNavigation")
            console.log('Logged in with details');
            const user = auth.currentUser
            dispatch(setUser(user))
           AsyncStorage.setItem(
                'token',JSON.stringify(user)
            )
            console.log('jjjjjjjjjjjjjjjjjjjjjjjjj',user);
        } catch (error) {
            console.log(error)
        }
    }

  
    useEffect(() => {
        const LoggedInUser = () => {
            const user = auth.currentUser
            dispatch(setUser(user))
            //console.log('=============', user);
        }
        return LoggedInUser()

    }, [])



    return (


        <KeyboardAvoidingView style={styles.container}
            behavior='padding'>
            <ImageBackground
                source={require('../assets/luu.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.containerinput}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Email'
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                        ></TextInput>
                        <TextInput
                            placeholder='Password'
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}

                        ></TextInput>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => handleLogin()}
                            style={styles.button}
                        >
                            <Text style={styles.buttonOutlineText}>Login</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ImageBackground >
        </KeyboardAvoidingView>

    )
}

export default Login

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: -20,
        padding:5


    },
    containerinput: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 250,
    },
    inputContainer: {
        width: '80%',
        marginTop: 15,
        margin: 40,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        height:50,
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#0783f9',
        paddingHorizontal: 15,
        borderRadius: 10,
        width:150,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#a16132',
    },
    buttonOutline: {
        backgroundColor: 'white',
        margin: 5,
        borderColor: '#078f9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        fontWeight: '700',
        fontSize: 16,
        color:'white',

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        blurType:"dark", 
        blurAmount:500 ,
    },
   
})