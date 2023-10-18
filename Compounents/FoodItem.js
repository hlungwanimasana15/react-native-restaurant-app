import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { coffeeItems } from '../constants';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';




const FoodItem = ({ item }) => {


  const navigation = useNavigation();

  return (
    <View style={styles.manuItem}>
      <View style={styles.FoodInfo}>
        <View style={{ alignItems: 'center', marginTop: 10 }} >
          <Image style={{
            width: 10, height: 150, borderRadius: 10,
          }} source={item.image} />
        </View>
        <View style={{ }} >
          <Text style={{ lineHeight: 20, fontSize: 20, color: '#d4bb7e', fontWeight: 'bold', zIndex: 1, marginTop: 3, marginBottom: 0 }}>{item.name}</Text>
          <Text style={{}}><AntDesign name="staro" size={24} color="black" />{item.stars}</Text>
          <Text style={{}}>Price:R{item.price}</Text>
          <View style={styles.priceContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Products', { ...item })}
              style={styles.plusButton}>
              <AntDesign name="plus" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>


      </View>

    </View >
  )
}

export default FoodItem

const styles = StyleSheet.create({

  manuItem: {
    borderRadius: 20,
    backgroundColor: '#f6efef',
    width: 170,
    height: 280,
    shadowColor: 'black',
    marginLeft: 25,
    marginBottom: 10,

  },
  FoodInfo: {
    color: 'black',

  },
  Details: {
    fontSize: 20,
    color: '#d4bb7e',
    zIndex: 1,
    marginTop: 3,
    marginBottom: 12,
    flexDirection: '',

  },
  plusButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 50,

  },
  priceContainer: {
    
    justifyContent:'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width:"100%",
  },

})