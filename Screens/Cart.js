import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { decreamentQuantity, removeFromCart, increamentQuantity,clearCart } from '../Slices/CartReducer';
import { useNavigation } from '@react-navigation/core';




const Cart = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart.cart)
  console.log('Karrrrrt',cart);

  const[ quantity,setQuantity] = useState(1)
  //clear Cart
  const clearItems = () =>{
    dispatch(clearCart());
  }

  //delete item from cart
  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item))
  }


  //increase quantity
  const increaseQuantity = (item) => {
    dispatch(increamentQuantity(item))
  }

  //decrease quantity
  const decreaseQuantity = (item) =>{
    dispatch(decreamentQuantity(item))
  }

  // Sample cart items for demonstration
  const [cartItems, setCartItems] = useState([]);
  
  


  // Calculate the total cost of items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
  };


  useEffect(() => {
    setCartItems(cart)
  }, [])

  // Render each item in the cart
  const renderItem = ({ item }) => {
      return (
       
        <View  style={styles.cartItem}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>R{item.price}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.quantityButton}
              onPress={() => decreaseQuantity(item)}>
              <AntDesign name="minuscircleo" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => increaseQuantity(item)}>
              <AntDesign name="pluscircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.deleteAdit}>
            <TouchableOpacity >
              <MaterialIcons name="delete" size={24} color="black"
                onPress={() => removeItemFromCart(item)}
              />
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
          </View>
        </View>


      );
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.cartList}
      />
      <Text style={styles.Delivary}>Free Delivary</Text>
      <Text style={styles.total}>Total: R{calculateTotal()}</Text>
      <TouchableOpacity onPress={() => clearItems()} style={styles.checkoutButton} >
        <Text style={styles.checkoutButtonText}> Clear Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => navigation.navigate('Checkout', { ...cart,calculateTotal:calculateTotal()})}style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartList: {
    flexGrow: 1,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
    color: 'gray',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  checkoutButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
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
    color: '#f3b1a9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  deleteAdit: {
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  Delivary:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  }
});

export default Cart;