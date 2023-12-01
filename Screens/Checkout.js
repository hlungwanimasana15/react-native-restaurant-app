import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { addDoc, collection, doc, getDoc, set, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useStripe } from '@stripe/stripe-react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const Checkout = () => {
  const { params } = useRoute();
  const stripe = useStripe();
  const { user } = useSelector(state => state.user)

  const [name, setName] = useState('')
  // const [dropOffAddress, setDropOffAddress] = useState('');
  const [selectedValue, setSelectedValue] = useState('default');
  const [isLoading, setIsLoading] = useState(true)
  const [userDetails, setUserDetails] = useState({})
  const cart = params

  const ItemArray = []

  Object.values(params).forEach(item => {
    if (item && item.name && item.price && item.quantity && item.image) {
      ItemArray.push({ item: item.name, price: item.price, quantity: item.quantity, image: item.image })
      console.log("sdad", item.name);
    }
  })


  const navigation = useNavigation();

  const fetchData = async () => {
    const userId = user.uid
    if (userId) {
      try {
        const userCollection = collection(db, 'usersInformation');
        const userDocRef = doc(userCollection, userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          let userInfo = userData
          setUserDetails(userInfo)
          console.log('+++++++++', userDetails);
          console.log('pppppppppppppppp', userInfo);
        } else {
          console.log('Failed to get user infromation')
        }

      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    }

  }
  const handlePlaceOrder = async () => {

  
    Alert.alert(
      'Confirm Order',
      'Are you sure you want to place the order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Place Order',
          onPress: async () => {
            const ordersRef = doc(db, 'orders', user.uid);
            const ordersInfo = { user, params };
            await setDoc(ordersRef, {
              dish: params,
              userId: user.uid,
            });
            Alert.alert('Order Placed Successfully');
          },
        },
      ],
      { cancelable: false }
    );
  

  };

  const CardDetails = async () => {
    setIsLoading(false);
    let name = {
      name: 'shops'
    }
    try {
      const response = await fetch("https://backend-at6b.onrender.com/pay", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer pk_test_51O0fWbFLBlgdGDy2gYhAzyg8sbLzN3ZhRvgKdM1srkOSxHT3TFEqcFqcV9Iwg450jNWMKzlStz8CefPnYR4Xi3Ha00z5e1EcSF'
        },
        body: JSON.stringify(name)

      });
      const data = await response.json()
      if (!response.ok) return Alert.alert(data.message)
      const clientSecret = data.clientSecret
      console.log(clientSecret);
      const initSheet = await stripe.initPaymentSheet({
        merchantDisplayName: "masana",
        paymentIntentClientSecret: clientSecret
      });
      setIsLoading(true);
      if (initSheet.error) return Alert.alert(initSheet.error.message)
      const presentSheet = await stripe.presentPaymentSheet({ clientSecret })
      if (presentSheet.error) return Alert.alert(presentSheet.error.message)
      Alert.alert('payment complete')
    } catch (error) {
      console.log(error);
      Alert.alert('error')
    }


  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text>Name: {item.item}</Text>
          <Text>Price:R {item.price}</Text>
          <Text>Quantity: {item.quantity}</Text>
        </View>
        <Image source={{ uri: item.image }} style={{ width: 80, height: 80 }} />
      </View>
    </View>
  );

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
    <ScrollView style={styles.container}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
      </View>

      <View style={styles.addressSection}>
        <Text style={styles.sectionTitle}>Drop-off Address</Text>
        <Text style={styles.addressText}>{userDetails.address}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.changeAddressText}>Change Address</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.ordersummary}>Order Summary</Text>
      <View  style={{marginBottom:70}}>
        <FlatList
          data={ItemArray}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>  

      
     
    </ScrollView>
    <View style={styles.buttonContainer}>
    <View style={styles.cardSection}>
        <TouchableOpacity style={styles.payments} title="Pay here" onPress={() => CardDetails()}
        ><MaterialIcons name="payment" size={64} color="black" />
        </TouchableOpacity>
      </View>
    <View style={styles.totalSection}>
        <Text style={styles.sectionTitle}>Order Total</Text>
        <Text style={styles.totalAmount}>R {cart.calculateTotal}</Text>
      </View>
    <TouchableOpacity style={styles.placeOrderButton} onPress={() => handlePlaceOrder()}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
     
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 90,
    marginBottom:50,
    backgroundColor:'#fff3e0'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressSection: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 10,
  },
  changeAddressText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  totalSection: {
    marginBottom: 16,
    marginHorizontal: 90,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  placeOrderButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',

  },
  placeOrderButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  methodDrop: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dropdownItems: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    borderCurve: 30,
    width: 90,
    height: 20,

  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  Header: {
    flexDirection: 'row'
  },
  ordersummary: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingBottom: 10,
  },
  buttonContainer:{
    paddingBottom:40,
    paddingHorizontal:20

  }
});

export default Checkout;
