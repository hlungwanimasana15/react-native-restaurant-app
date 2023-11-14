
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
      <Image
        source={require('../assets/vage.webp')}
        style={styles.backgroundImage}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartButton}>
            <AntDesign name="hearto" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image}} style={styles.coffeeImage} />
        </View>
        <View style={styles.starContainer}>
          <View style={styles.starBackground}>
            <AntDesign name="staro" size={15} color="white" />
            <Text style={styles.starText}>{item.reviews}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.coffeeName}>{item.name}</Text>
          <Text style={styles.coffeePrice}>R {item.price}</Text>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutText}>About</Text>
          <Text style={styles.aboutDescription}>{item.discr}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <View style={styles.volumeContainer}>
            <View style={styles.volumeTextContainer}>
              <Text style={styles.volumeLabelText}>Volume</Text>
              <Text style={styles.volumeText}>{item.volume}</Text>
            </View>
          
          </View>
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
    marginBottom:80,

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
  },
  backButton: {
    borderRadius: 50,
  },
  heartButton: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
  },
  imageContainer: {
    shadowColor: 'black',
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coffeeImage: {
    height: 200,
    width: 200,
    marginTop: 40,
  },
  starContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d5a12e',
    width: 60,

  },
  starBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    paddingHorizontal: 8,
  },
  starText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coffeeName: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  coffeePrice: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sizeContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  sizeText: {
    color: 'black',
    fontSize: 20,
  },
  sizeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sizeButton: {
    backgroundColor: 'rgba(0,0,0,0.07)',
    padding: 12,
    borderRadius: 50,
    flex: 1,
  },
  activeSizeButton: {
    backgroundColor: 'black',
  },
  activeSizeText: {
    color: 'white',
  },
  inactiveSizeText: {
    color: 'gray',
  },
  aboutContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  aboutText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  aboutDescription: {
    color: 'gray',
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
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
  volumeText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    padding: 8,
    marginLeft: 20,
  },
  quantityButton: {
    padding: 8,
  },
  quantityValue: {
    color: 'black',
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
    borderColor: 'gray',
  },
  buyNowButton: {
    backgroundColor: '#d5a12e',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 190,
    height: 60,
    marginTop: 15,

  },
  buyNowText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

})