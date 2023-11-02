
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useDispatch, useSelector } from 'react-redux';
import setData from '../Slices/dataSlice';
import { auth, db } from '../firebase';
import { collection, doc, getDoc, updateDoc, storage, query, where, getDocs } from 'firebase/firestore';

const Profile = () => {

    const { data } = useSelector(state => state.data)
    const [userDetails, setUserDetails] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [cardName, setCardName] = useState('')
    const [loading, setIsLoading] = useState('')
    const [userData, setUserData] = useState(null);

    const user = auth.currentUser




    const navigation = useNavigation()

    const dispatch = useDispatch()

    // const OrderHistory = async () =>{
    //     const currentUser = getAuth().currentUser;

    //     // Get the UID of the logged-in user
    //     const uid = currentUser.uid;


    //     const userRef = collection(db, "orders");
    //     const querySnapshot = await getDocs(query(userRef, where("uid", "==", uid)));

    //     // Display the fetched information
    //     querySnapshot.forEach((doc) => {
    //       const userData = doc.data();
    //       console.log(userData);
    //     });
    // }

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

    }

    const fetchData = async () => {

        if (user.uid) {
            try {
                const userCollection = collection(db, 'usersInformation');
                const userDocRef = doc(userCollection, user.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    let userInfo = userData
                    // setUserDetails(userInfo)
                    dispatch(setData(userInfo));
                    console.log('userinfo', userInfo);

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


    useEffect(() => {
        // const unsubscribe = onAuthStateChanged(auth, u => {
        //     navigation.navigate("Home")
        //     dispatch(setUser(u))
        // })
        fetchData()

        // return unsubscribe

        const fetchOrderHistory = async () => {
            const currentUser = getAuth().currentUser;
            const uid = currentUser.uid;

            const db = getFirestore();
            const userRef = collection(db, 'orders');
            const querySnapshot = await getDocs(query(userRef, where('uid', '==', uid)));

            querySnapshot.forEach((doc) => {
                const fetchedUserData = doc.data();
                setUserData(fetchedUserData);
                console.log('----------',fetchedUserData)
            });
        }
        fetchOrderHistory();

    }, [])


    return (


        <KeyboardAvoidingView style={styles.container}
            behavior='padding'

        >
            <ImageBackground
                source={require('../assets/roosi.jpg')}
                style={styles.backgroundImage}
            >

                <Text style={{ fontSize: 50, color: 'white' }}>Hi:</Text>

                <Text style={{ fontSize: 30, color: 'white',paddingBottom:'auto',padding:10 }}>Orders history</Text>
                <View style={styles.historyContainer}>
                    {userData ? (
                        <View >
                            <Text >Name: {userData.name}</Text>
                            <Text>price: {userData.price}</Text>
                            <Text>quantity: {userData.quantity}</Text>
                            <Text>Volume: {userData.volume}</Text>
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
                <View style={styles.buttons}>

                    <TouchableOpacity
                        onPress={() => EditUserInfo()}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Edit</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </KeyboardAvoidingView>

    )
}

export default Profile

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
        borderRadius: 5,
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

    },
    historyContainer:{
        backgroundColor: 'white',
        padding: 16,
        paddingLeft:10,
        borderRadius: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        marginBottom: 5,
    }

})