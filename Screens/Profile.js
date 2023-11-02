
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useDispatch, useSelector } from 'react-redux';
import setData from '../Slices/dataSlice';
import { auth, db } from '../firebase';
import { collection, doc, getDoc, updateDoc, storage, query, where, getDocs } from 'firebase/firestore';
// import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {

    const { user } = useSelector(state => state.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardName, setCardName] = useState('')
    const [loading, setIsLoading] = useState('')
    const [userDetails, setUserDetails] = useState({})
    const [userInfo, setUserInfo] = useState('')
    const navigation = useNavigation()
    const dispatch = useDispatch()


    const OrderHistory = async () => {
        const currentUser = getAuth().currentUser;

        // Get the UID of the logged-in user
        const uid = currentUser.uid;

        const userRef = collection(db, "orders");
        const querySnapshot = await getDoc(query(userRef, where("uid", "==", uid)));

        // Display the fetched information
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log(userData);
        });
    }

    const EditUserInfo = async () => {

        try {
            if (user.uid) {
                const userCollection = collection(db, 'usersInformation');
                const userDocRef = doc(userCollection, user.uid);
                // Create an object with the updated user information
                const updatedUser = {
                    email: email,
                    name: name,
                    surname: surname,
                    contact: contact,
                    address: address,
                    cardNumber: cardNumber,
                    cardName: cardName,
                };
                await updateDoc(userDocRef, updatedUser);
                // Update the state to reflect the changes
                setUserDetails(updatedUser);
                console.log('User information updated successfully');
            }
        } catch (error) {
            console.error('Error updating user information:', error);
        }

    };

    const fetchData = async () => {

        const userId = user.uid
        if (userId) {
            try {
                const userCollection = collection(db, 'usersInformation');
                const userDocRef = doc(userCollection, userId);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    console.log('UserInfo:', userData);
                    setUserInfo(userData)

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

    // Clear user authentication data for logout
    const clearAuthenticationData = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
        } catch (error) {
            console.error('Error clearing authentication data:', error);
        }
    };

    const handleLogout = () => {
        clearAuthenticationData();
        navigation.navigate('Welcome');

    }
        useEffect(() => {

            if (userInfo) {
                setEmail(userInfo.email || ''); // Use default value if email is undefined
                setName(userInfo.name || '');
                setSurname(userInfo.surname || '');
                setContact(userInfo.contact || '');
                setAddress(userInfo.address || '');
                setCardNumber(userInfo.cardNumber || '');
                setCardName(userInfo.cardName || '');
            }

        }, [userInfo])

        useEffect(() => {
            fetchData()
            const fetchOrderHistory = async () => {
                const currentUser = getAuth().currentUser;
                const uid = currentUser.uid;

                const db = getFirestore();
                const userRef = collection(db, 'orders');
                const querySnapshot = await getDocs(query(userRef, where('uid', '==', uid)));

                querySnapshot.forEach((doc) => {
                    const fetchedUserData = doc.data();
                    setUserData(fetchedUserData);
                    console.log('----------', fetchedUserData)
                });
            }
            fetchOrderHistory();
        }, [])

        return (


            <KeyboardAvoidingView style={styles.container}
                behavior='padding'

            >
                <ImageBackground
                    source={require('../assets/min.jpg')}
                    style={styles.backgroundImage}
                >

                    <Text style={{ fontSize: 50, color: 'black' }}>Hi:{userDetails.name}</Text>

                    <Text style={{ fontSize: 30, color: 'black', paddingBottom: 'auto', padding: 10 }}>What you once ordered</Text>
                    <View style={styles.historyContainer}>
                        {userDetails ? (
                            <View >
                                <Text >Name: </Text>
                                <Text>price: </Text>
                                <Text>quantity: </Text>
                                <Text>Volume:</Text>
                            </View>
                        ) : (
                            <Text>Loading user data...</Text>
                        )}
                    </View>
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
                    <View style={styles.buttons}>

                        <TouchableOpacity
                            onPress={() => EditUserInfo()}
                            style={styles.button}
                        >
                            <Text style={styles.buttonOutlineText}>Save changes</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} >
                            <Text style={styles.buttonText} >Logout</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>

        )
    }



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
            backgroundColor: '#d0711e',
            paddingHorizontal: 10,
            borderRadius: 5,
            marginLeft: '20%',
            alignItems: 'center',
        },
        buttonOutline: {
            backgroundColor: 'white',
            borderColor: '#078f9',
            paddingLeft: 15,
            justifyContent: "center",
            alignItems: 'center',
        },
        buttonText: {
            color: '#F0978C',
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
        buttons: {
            flexDirection: 'row',
            justifyContent: 'space-between'

        },
        historyContainer: {
            backgroundColor: 'white',
            padding: 16,
            paddingLeft: 10,
            borderRadius: 10,
            margin: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 3,
            marginBottom: 5,
        },
        logoutButton: {
            backgroundColor: '#007AFF', // Change this to your desired background color
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
        },
        buttonText: {
            color: 'white', // Change this to your desired text color
            fontSize: 16,
            fontWeight: 'bold',
        },
    })
    export default Profile