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

      <TouchableOpacity onPress={() => navigation.navigate('Products', { ...item })} style={styles.plusButton}>
        <AntDesign name="plus" size={35} color="orange" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    // flex:1,
    borderRadius: 10,
    backgroundColor: 'white',
    width: "43%",
    height: 250,
    margin: 10,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  container: {
    position: 'relative',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
  },
  description: {
    marginTop: -5,
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 0,
    marginRight: 0,
  },
  ratingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
     marginTop: -13,
    paddingRight: 5,
    marginRight: 20,
    marginBottom:15
  },
  price: {
    marginTop: 17,
    marginLeft: -7,
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
});

export default FoodItem;
