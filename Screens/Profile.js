
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../Slices/SliceUsers';



const Registration = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardName, setCardName] = useState('')
    const { user } = useSelector(state => state.user)
    const navigation = useNavigation()
    const [ userDetails,setUserDetails] = useState('')
    const dispatch = useDispatch()

    const userId = user.uid
    //get user information
    const fetchData = async () => {

        if (userId) {
            try {
                const userCollection = collection(db, 'usersInformation');
                const userDocRef = doc(userCollection, userId);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    setUserDetails(userData);
                    dispatch(setUserInfo(userData));
                } else {
                    console.log('Failed to get user infromation')
                }
                
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false);
            }
        }

    }
    console.log(userDetails);

    const SaveChanges = () => {


    }
 useEffect(() =>{
    fetchData()
 },[])

    return (


        <KeyboardAvoidingView style={styles.container}
            behavior='padding'>
            <ImageBackground
                source={require('../assets/roosi.jpg')}
                style={styles.backgroundImage}
            >
                <Text style={{ fontSize: 50, fontStyle: 'bold', color: 'white' }}>Hi:{name}</Text>
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
                        placeholder='Card Name'
                        value={cardName}
                        onChangeText={text => setCardName(text)}
                        style={styles.input}

                    ></TextInput>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => SaveChanges()}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Edit</Text>
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
        paddingHorizontal: 10,
        borderRadius: 10,
        width: '30%',
        justifyContent: "center",
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        margin: 10,
        borderColor: '#078f9',
        borderWidth: 2,
        paddingLeft: 15,
        justifyContent: "center",
        alignItems: 'center',
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