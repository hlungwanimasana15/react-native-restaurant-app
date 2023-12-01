
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const FoodItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Products', { ...item })}>
       <View style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.iconContainer}>
          <AntDesign name="hearto" size={24} color="orange" />
        </View>
      </View>

      <View style={styles.description}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.ratingContainer}>
            <Text style={styles.price}>Price: R{item.price}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Products', { ...item })}
        style={styles.plusButton}
      >
        <AntDesign name="plus" size={35} color="orange" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    position: 'relative',
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
    marginLeft: -20,
    marginRight: 0
  },
  ratingContainer: {
    flexDirection: 'colomn',
    alignItems: 'flex-start',
    marginTop: 5,
    paddingRight: 10,
    marginRight: 40

  },
 
  price: {
    marginTop: 5,
    marginLeft: -20,
  },
  plusButton: {
    
    position: 'absolute',
    bottom: 20,
    right: 10
  },
  starContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
  
},iconContainer: {
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: 'transparent', // Set to transparent to allow the image to show through
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

export default FoodItem;
