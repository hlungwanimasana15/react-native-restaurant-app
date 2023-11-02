
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const FoodItem = ({ item }) => {
  const navigation = useNavigation();

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
    marginRight:0
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingRight:10,
    marginRight:60

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

export default FoodItem;
