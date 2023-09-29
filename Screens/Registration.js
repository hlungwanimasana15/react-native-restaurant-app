
import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core'


const Registration = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardName, setCardName] = useState('')

    const navigation = useNavigation()

    const handleSignUp = () => {

        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('User registered:', user);
                })

        } catch (error) {
            console.error('Error registering user:', error);
        }

    }



    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Login")
            }
        })

        return unsubscribe
    }, [])

    return (


        <KeyboardAvoidingView style={styles.container}
            behavior='padding'>
            <ImageBackground
                source={require('../assets/roosi.jpg')} 
                style={styles.backgroundImage}
            >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Name'
                    value={name}
                    onChangeText={text => setName(text)}

                    style={styles.input}
                ></TextInput>
                <TextInput
                    placeholder='Surname'
                    value={surname}
                    onChangeText={text => setSurname(text)}
                    style={styles.input}

                ></TextInput>
                <TextInput
                    placeholder='Contact Number'
                    value={contact}
                    onChangeText={text => setContact(text)}

                    style={styles.input}
                ></TextInput>
                <TextInput
                    placeholder='Address'
                    value={address}
                    onChangeText={text => setAddress(text)}
                    style={styles.input}

                ></TextInput>
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
                <TextInput
                    placeholder='Card Number'
                    value={cardNumber}
                    onChangeText={text => setCardNumber(text)}

                    style={styles.input}
                ></TextInput>
                <TextInput
                    placeholder='Card Number'
                    value={cardName}
                    onChangeText={text => setCardName(text)}
                    style={styles.input}

                ></TextInput>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => handleSignUp()}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>

            </View>
            </ImageBackground>
        </KeyboardAvoidingView>

    )
}

export default Registration

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',

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

})