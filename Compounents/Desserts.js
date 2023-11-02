import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ImageBackground, Animated, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { db } from '../firebase';
import { collection, getDocs, query, where, } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Desserts = () => {
    useEffect(() => {
        getDesserts();
      }, [])

    const [desserts, setDesserts] = useState([])
    const navigation = useNavigation();

    const fetchedData = [];
    const getDesserts = async () => {

        try {
    
          const querySnapshot = query(collection(db, "items"), where("category", "==", "Desserts"));
    
          const data = await getDocs(querySnapshot);
    
          data.forEach((doc) => {
            console.log("doc.id", doc.data());
           fetchedData[doc.id] = doc.data();
          });
          setDesserts(Object.values(fetchedData))
          console.log('dessss', desserts);
        } catch (error) {
          console.log('failed to get desserts');
        }
    
    
      }
    
      console.log('dessss', desserts);
    
      const renderItem = ({ item }) => {
        return (
          <View style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
    
            <View style={styles.description}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.ratingContainer}>
                <AntDesign name="staro" size={24} color="gold" style={styles.starIcon} />
                <Text style={styles.ratingText}>{item.reviews}</Text>
              </View>
              <Text style={styles.price}>Price: R{item.price}</Text>
            </View>
    
            <TouchableOpacity
              onPress={() => navigation.navigate('Products', { ...item })}
              style={styles.plusButton}
            >
              <AntDesign name="plus" size={35} color="black" />
            </TouchableOpacity>
          </View>
        )
            }

    
          
  return (
    <View   style={styles.container} >
          <View style={styles.Header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Desserts</Text>
      </View>
      
    <View style={styles.manu} >
         
           
          <FlatList
            data={desserts}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />

     </View >
  
     </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:90
    },
    menuItem: {
      borderRadius: 10,
      backgroundColor: 'white',
      width: 170,
      height: 290,
      marginLeft: 10,
      marginRight: 5,
      marginTop: 10,
      padding: 20,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 10,
      alignSelf: 'center',
    },
    description: {
      marginTop: 10,
      alignItems: 'center',
    },
    name: {
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
      marginLeft:-20,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
      paddingRight:10
    },
    starIcon: {
      marginRight: 5,
     
    },
    ratingText: {
      fontSize: 16,
      
    },
    price: {
      marginTop: 5,
      marginLeft:-20,
    },
    plusButton: {
      alignSelf: 'flex-end',
      marginTop: -15,
    },
  });
  
  

export default Desserts