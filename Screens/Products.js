
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
  const [size, setSize] = useState('small');


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
          <Image source={item.image} style={styles.coffeeImage} />
        </View>
        <View style={styles.starContainer}>
          <View style={styles.starBackground}>
            <AntDesign name="staro" size={15} color="white" />
            <Text style={styles.starText}>{item.stars}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.coffeeName}>{item.name}</Text>
          <Text style={styles.coffeePrice}>$ {item.price}</Text>
        </View>
        <View style={styles.sizeContainer}>
          <Text style={styles.sizeText}>Coffee size</Text>
          <View style={styles.sizeButtons}>
            <TouchableOpacity
              onPress={() => setSize('small')}
              style={[
                styles.sizeButton,
                size === 'small' && styles.activeSizeButton,
              ]}
            >
              <Text style={size === 'small' ? styles.activeSizeText : styles.inactiveSizeText}>
                Small
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize('medium')}
              style={[
                styles.sizeButton,
                size === 'medium' && styles.activeSizeButton,
              ]}
            >
              <Text style={size === 'medium' ? styles.activeSizeText : styles.inactiveSizeText}>
                Medium
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSize('large')}
              style={[
                styles.sizeButton,
                size === 'large' && styles.activeSizeButton,
              ]}
            >
              <Text style={size === 'large' ? styles.activeSizeText : styles.inactiveSizeText}>
                Large
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutText}>About</Text>
          <Text style={styles.aboutDescription}>{item.desc}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <View style={styles.volumeContainer}>
            <View style={styles.volumeTextContainer}>
              <Text style={styles.volumeLabelText}>Volume</Text>
              <Text style={styles.volumeText}>{item.volume}</Text>
            </View>
            <View style={styles.quantityButtons}>
              <TouchableOpacity style={styles.quantityButton}
                onPress={handleDecrease}>
                <AntDesign name="minuscircleo" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncrease}>
                <AntDesign name="pluscircleo" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buyButtonContainer}>
            <TouchableOpacity style={styles.cartButton}>
              <AntDesign name="shoppingcart" size={24} color="black"
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

            <Text style={styles.buyNowText}>Buy now</Text>
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
    shadowColor: '#f38d8d',
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
    backgroundColor: '#f38d8d',
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
    color: '#f38d8d',
    fontSize: 24,
    fontWeight: 'bold',
  },
  coffeePrice: {
    color: '#f38d8d',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sizeContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  sizeText: {
    color: '#f38d8d',
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
    backgroundColor: '#f38d8d',
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
    color: '#f38d8d',
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
    color: '#f38d8d',
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
    color: '#f38d8d',
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
    backgroundColor: '#f38d8d',
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