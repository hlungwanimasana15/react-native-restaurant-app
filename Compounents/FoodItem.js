import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { coffeeItems } from '../constants';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';




const FoodItem = ({ item }) => {


  const navigation = useNavigation();

  return (
    <View style={styles.manuItem}>
      <View style={{ alignItems: 'center', marginTop: 35 }} >
        <Image style={{ width: 150, height: 150, borderRadius: 5 }} source={item.image} />
      </View>
    
        <View style={styles.discription}>
        <Text style={{ lineHeight: 20, fontSize: 20, color: 'black', fontWeight: 'bold', zIndex: 1, marginTop: 3, marginBottom: 0 ,marginLeft:-8}}>{item.name}</Text>
        <Text  style={{ paddingTop:5,marginLeft:-8}} ><AntDesign name="staro" size={24} color="gold" style={{ paddingTop:5}}  />{item.stars}</Text>
        <Text  style={{ paddingTop:5,marginLeft:-8}} >Price:R{item.price}</Text>
        </View>
        
        <View style={styles.priceContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Products', { ...item })}
          style={{justifyContent: 'flex-end', alignItems: 'flex-end',marginBottom: 7,marginRight:-15}}
          >
          <AntDesign name="plus" size={35} color="black" style={{ alignSelf: 'flex-end',paddingBottom:5}} />
        </TouchableOpacity>
      </View>
      </View>
     
  
  )
}

export default FoodItem

const styles = StyleSheet.create({

  manuItem: {
    borderRadius: 30,
    backgroundColor: 'white',
    width: 170,
    height: 280,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 15,
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,


  },
  plusButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'flex-end',

  },
  // priceContainer: {

  //   justifyContent: 'flex-end',
  //   alignItems: 'flex-end',
  //   marginBottom: 20,
  //   width: "100%",
  //   marginRight:-10,
    // paddingBottom:-10
  // },
  discription:{
    justifyContent: 'space-around', 
    fontSize:15,
    marginVertical: 10,
  }

})