import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Button } from 'react-native';
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
  const [dropOffAddress, setDropOffAddress] = useState('');
  const [selectedValue, setSelectedValue] = useState('default');
  const [isLoading, setIsLoading] = useState(true)
  const [userDetails, setUserDetails] = useState({})
  const cart = params
  console.log('============', params)


  const navigation = useNavigation();
  // const user = useSelector(state => state.user);



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
  //  const user = auth.currentUser
  // console.log('ppppppppppppppppppppp',user.uid);
  const handlePlaceOrder = async () => {

    const ordersRef = doc(db, 'orders', user.uid);
    const ordersInfo = { user, params }
    await setDoc(ordersRef, {

      dish: params,
      userId: user.uid

    })
  };

  console.log(name);

  const CardDetails = async () => {
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
      <View style={styles.Header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Checkout</Text>
      </View>
      

      <View style={styles.addressSection}>
        <Text style={styles.sectionTitle}>Drop-off Address<MaterialIcons name="delivery-dining" size={24} color="black" /></Text>
        <Text style={styles.addressText}>{userDetails.address}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.changeAddressText}>Change Address</Text>
        </TouchableOpacity>
      </View>



      <View style={styles.cardSection}>
        <TouchableOpacity style={styles.payments} title="Pay here" onPress={() => CardDetails()}
        ><Text style={styles.buttonText}>Pay here</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop:90,
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
    fontSize: 36,
    backgroundColor:'#b7b7b7'
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
  payments:{
    backgroundColor: '#575757', 
    padding: 15,
    borderRadius: 5, 
    alignItems: 'center',
  },
  buttonText:{
    color: 'white', 
    fontWeight: 'bold', 
  },
  Header:{
    flexDirection: 'row'
  }
});

export default Checkout;
