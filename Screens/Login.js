import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core'
import { collection, doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../Slices/SliceUsers';

const { user } = useSelect

const Login = () => {

    const navigation = useNavigation()

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading,setIsLoading ]=useState('')
    const userId = user.uid

    




const handleSignUp = () => {
    navigation.navigate("Registration")
}

const handleLogin = () => {

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            navigation.navigate("Home")
            console.log('Logged in with:', user.email);
        })
        .catch(error => alert(error.message))
}

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        
            navigation.navigate("Home")
            dispatch(setUser(user))
    
    })

    return unsubscribe
}, [])

return (


    <KeyboardAvoidingView style={styles.container}
        behavior='padding'>
        <ImageBackground
            source={require('../assets/2nd.jpg')}
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
                    <Text style={styles.RegText}> Don't have an account ? Register now</Text>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Register</Text>
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


    },
    containerinput: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 250,
    },
    inputContainer: {
        width: '50%',
        marginTop: 15,
        margin: 40,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
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

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    RegText: {
        color: 'white',
        fontSize: 20,
    }

})