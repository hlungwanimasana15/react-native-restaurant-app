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
                source={require('../assets/welcome.jpg')}
                style={styles.backgroundImage}
            >
            {/* <View style={styles.text}>
               
            </View> */}


                <View >
                <TouchableOpacity   style={styles.buttonLog} onPress={() => navigation.navigate('Login')}><Text style={styles.buttonText} >Login</Text></TouchableOpacity>
                
                <TouchableOpacity  style={styles.buttonReg} onPress={() => navigation.navigate('Registration')}><Text style={styles.buttonTextReg}> Register</Text></TouchableOpacity>
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
       

    },
    backgroundImage:{
        width:'100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',

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
        // backgroundColor: '#FFF7FA',
        borderTopEndRadius: 60,
        borderTopStartRadius: 60,
        paddingBottom:-170,
        
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
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        width: 300,
        alignItems: 'center', 
        height:'auto'
    },
    buttonLog:{
        backgroundColor: 'orange',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        width: 300,
        alignItems: 'center',
        height:'auto',
    },
    buttonTextReg:{
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }


})
export default Welcome