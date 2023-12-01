import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ImageBackground, Animated, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { db } from '../firebase';
import { collection, getDocs, query, where, } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const maincourse = () => {
    useEffect(() => {
        getmaincourse();
      }, [])

    const [maincourse, setMaincourse] = useState([])
    const navigation = useNavigation();

    const fetchedData = [];
    const getmaincourse = async () => {

        try {
    
          const querySnapshot = query(collection(db, "items"), where("category", "==", "Main course"));
    
          const data = await getDocs(querySnapshot);
    
          data.forEach((doc) => {
            console.log("doc.id", doc.data());
           fetchedData[doc.id] = doc.data();
          });
          setMaincourse(Object.values(fetchedData))
          console.log('dessss', maincourse);
        } catch (error) {
          console.log('failed to get maincourse');
        }
    
    
      }
    
      console.log('dessss', maincourse);
    
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
          <View style={styles.headereader}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Main Course</Text>
      </View>
      
    <View style={styles.manu} >
         
    <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 0,
              flexWrap: 'wrap',
              flexDirection: 'row',
              width:'100%'
            }}

          >
           {maincourse.map((item,index) =>(
            <View style={styles.menuItem} key={index}>
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
           ))}

         
          </ScrollView>
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
  width: '48%',
  height: 290,
  marginVertical:'1%',
  marginHorizontal:'1%',
  padding: 20,
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 5,
  display:'flex',
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
header: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
  marginBottom: 20,

},
title: {
  fontSize: 20,
  fontWeight: 'bold',
},

});

  
  

export default maincourse