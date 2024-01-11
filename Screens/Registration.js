
import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core'
import { doc, setDoc } from 'firebase/firestore';



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

    const handleSignUp =  () => {

        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async(userCredential) => {
                    const user = userCredential.user;
                    console.log(user)
                    const ref = doc(db, 'usersInformation', user.uid)
                    const docRef = await setDoc(ref,{ name,email,surname,contact,address,cardNumber,cardName })
                    console.log('User registered:', user);
                })
                navigation.navigate('Login')
        } catch (error) {
            console.error('Error registering user:', error);
        }

    }  
    return (


        <KeyboardAvoidingView style={styles.container}
            behavior='height'>
            <ImageBackground
                source={require('../assets/signup.jpg')}
                style={styles.backgroundImage}
            >
               
                
                <View style={styles.inputContainer}>
                <View style={styles.titleContainer}>
                <Text style={styles.title}>Sign Up</Text>
                </View>
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
                   
                   
                </View>
                <View  style={{ flex: 1,alignItems:'center', marginBottom: 125 ,width:'95%',height:50,paddingLeft:30}}>
                    <TouchableOpacity
                        onPress={() => handleSignUp()}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Sign Up</Text>
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
        // paddingTop:'150px'

    },
    inputContainer: {
        width: '80%',
        marginTop: 165,
        margin: 40,
        paddingLeft:0,
        // backgroundColor: 'red',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        height: 50,
        marginBottom: 10,
        paddingLeft: 10,
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width:'70%',
        height:50,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 125,
        justifyContent:'center',
        alignItems:'center',

    },
    buttonOutline: {
        backgroundColor: 'orange',
        margin: 5,
        borderColor: 'orange',
        borderWidth: 2,
        justifyContent:'center',
        alignItems:'center',
       

    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        fontWeight: '700',
        fontSize: 16,
        color:'white'
       
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    titleContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        color: '#ffa726',
        fontSize: 34,
        marginBottom: 16,
        fontWeight: 'bold',
    },

})