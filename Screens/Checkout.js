import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useStripe } from '@stripe/stripe-react-native';



const Checkout = () => {

  const stripe = useStripe();


  const [name, setName] = useState('')
  const { params } = useRoute();

  const cart = params


  const navigation = useNavigation();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user);
  const [dropOffAddress, setDropOffAddress] = useState('');
  const [selectedValue, setSelectedValue] = useState('default');
  const [isLoading, setIsLoading] = useState(true)
  const [userDetails, setUserDetails] = useState({})


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


  const handlePlaceOrder = () => {
    // Implement the logic to place the order
    // You can navigate to a confirmation screen or perform other actions here
  };
  console.log( name);

  const CardDetails = async () => {
     let name = {
      name:'shops'
     }
    try {
      const response = await fetch("https://backend-at6b.onrender.com/pay", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer pk_test_51O0fWbFLBlgdGDy2gYhAzyg8sbLzN3ZhRvgKdM1srkOSxHT3TFEqcFqcV9Iwg450jNWMKzlStz8CefPnYR4Xi3Ha00z5e1EcSF'
        },
        body: JSON.stringify( name )
        
      });
      const data = await response.json()
      if (!response.ok) return Alert.alert(data.message)
      const clientSecret = data.clientSecret
    console.log(clientSecret);
      const initSheet = await stripe.initPaymentSheet({
        merchantDisplayName:"masana",
        paymentIntentClientSecret: clientSecret
      });

      if (initSheet.error) return Alert.alert(initSheet.error.message)
      const presentSheet = await stripe.presentPaymentSheet({ clientSecret })
      if (presentSheet.error) return Alert.alert(presentSheet.error.message)
      Alert.alert('payment complete')
    } catch (error) {
      console.log(error);
      Alert.alert('error')
    }


  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <View style={styles.addressSection}>
        <Text style={styles.sectionTitle}>Drop-off Address</Text>
        <Text style={styles.addressText}>{userDetails.address}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.changeAddressText}>Change Address</Text>
        </TouchableOpacity>

      </View>



      <View style={styles.cardSection}>

        <TextInput onChangeText={(text) => setName(text)}
          placeholder="Name" style={{
            width: 300,
            fontSize: 20,
            padding: 10,
            borderWidth: 1,
          }}> </TextInput>
        <Button style={styles.methodDrop}  title="Pay here" onPress={() => CardDetails()}>Choose Payment option</Button>
      </View>

      <Text style={styles.methodDrop}>{selectedValue}</Text>
      <View style={styles.totalSection}>
        <Text style={styles.sectionTitle}>Order Total</Text>
        <Text style={styles.totalAmount}>R {cart.calculateTotal}</Text>
      </View>
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
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
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addressSection: {
    marginBottom: 16,
  },
  addressText: {
    fontSize: 16,
  },
  changeAddressText: {
    fontSize: 16,
    color: 'blue',
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
});

export default Checkout;
