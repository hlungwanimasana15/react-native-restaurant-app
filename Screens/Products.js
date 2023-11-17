
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { AddToCart } from '../Slices/CartReducer';
import { useDispatch } from 'react-redux';


const Products = (props) => {

  const dispatch = useDispatch();

  const AddItemToCart = (item) => {
    dispatch(AddToCart(item));
  }
  // const cart = useSelector((state) => state.cart.cart)
  // console.log(cart);

  const [quantity, setQuantity] = useState(1);

  const item = props.route.params;

  const navigation = useNavigation();

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
    console.log(quantity)
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };


  return (
    <View style={styles.container} >
      <StatusBar style="light" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={35} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.coffeeImage} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.coffeeName}>{item.name}</Text>
          <Text style={styles.coffeePrice}>R {item.price}</Text>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutText}>Description</Text>
          <Text style={styles.aboutDescription}>{item.discr}</Text>
        </View>
        <View style={styles.quantityContainer}>

          <Text style={styles.volumeText}>{item.volume}</Text>
          <View style={styles.buyButtonContainer}>
            <TouchableOpacity style={styles.cartButton}>
              <AntDesign name="shoppingcart" size={34} color="#d5a12e"
                onPress={() => navigation.navigate('Cart', { ...item })} />
            </TouchableOpacity>
          </View>

        </View>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>

          <TouchableOpacity style={styles.buyNowButton}
            onPress={() => AddItemToCart(item)}>

            <Text style={styles.buyNowText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default Products

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 80,
    paddingTop: 30,
  },
  backgroundImage: {
    height: 300,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    width: '100%',
    position: 'absolute',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    position: 'absolute',
    top: 30,
    zIndex: 20
  },
  backButton: {
    borderRadius: 8,
    padding: 10,
  },
  heartButton: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    height: '50%',

  },
  coffeeImage: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
  starContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d5a12e',
    width: 60,
    borderRadius: 15,
  },
  starBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
  },
  starText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 4,
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coffeeName: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
  },
  coffeePrice: {
    color: '#555',
    fontSize: 20,
    fontWeight: 'bold',
  },
  aboutContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  aboutText: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  aboutDescription: {
    color: '#666',
    marginTop: 8,
  },
  quantityContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeLabelText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  volumeText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    padding: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#d5a12e',
  },
  buyNowButton: {
    backgroundColor: '#d5a12e',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 110,
  },
  buyNowText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});