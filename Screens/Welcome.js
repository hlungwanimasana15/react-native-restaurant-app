import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'

const Welcome = () => {
    const navigation = useNavigation();

    useEffect(()=>{
        setTimeout(() =>{
            navigation.navigate("TabNavigation")

        },3000)
    },[])
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/welcom.jpg')}
                style={styles.backgroundImage}
            >
            <View style={styles.text}>
                <Text style={styles.welcomeText} >Welcome to Mills</Text>
            </View>
            <View style={styles.buttons}>
                <Text  style={styles.Line}>Where you're always the special of the day. Sit back, relax, and let us take care of the rest 🍽️.</Text>
                <TouchableOpacity   style={styles.buttonLog} onPress={() => navigation.navigate('Login')}><Text style={styles.buttonText} >Login</Text></TouchableOpacity>
                
                <TouchableOpacity  style={styles.buttonReg} onPress={() => navigation.navigate('Registration')}><Text style={styles.buttonText}> Register</Text></TouchableOpacity>

            </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'baseline',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,

    },
    welcomeText: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Courier New',
        paddingBottom: 200,
        color:'#bd6900'

    },
    buttons: {
        flex: 1,
        width: 400,
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FFF7FA',
        borderTopEndRadius: 60,
        borderTopStartRadius: 60,
        paddingBottom:70,
        
    },
    text: {
        
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonReg:{
        backgroundColor: '#3a312b',
        padding: 15,
        borderRadius: 15,
        width: 300,
        alignItems: 'center', 
        height:'auto'
    },
    buttonLog:{
        backgroundColor: '#bd9a6f',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        width: 300,
        alignItems: 'center',
        height:'auto',
    },
    Line:{
        paddingBottom:110,
        paddingTop:60,
        fontFamily:'Times New Roman',
        fontSize:27,
    }


})
export default Welcome