
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Screens/Login';
import HomeScreen from './Screens/HomeScreen';
import Registration from './Screens/Registration'
import Manu from './Screens/Manu';
import Cart from './Screens/Cart'
import Products from './Screens/Products';
import { Ionicons } from '@expo/vector-icons';
import Profile from './Screens/Profile';
import Checkout from './Screens/Checkout'
 import Welcome from './Screens/Welcome';
import Tabnavigation from './Tabnavigation';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUser } from './Slices/SliceUsers';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

 
export default function Navigation() {

  const dispatch = useDispatch()
  //  const [ user,setUser] =useState('')

  useEffect (() =>{
    const perc = async() => {
      const GetItems =await AsyncStorage.getItem(
        'token'
      )
      const  store = JSON.parse(GetItems)
      console.log("++++++++",store);
      if( store !== null ){
        dispatch(setUser(store))
        
      }

    }
    perc()
  },[])
  
    // return (
   
    //   <NavigationContainer >
      
    //     <Stack.Navigator initialRouteName="Welcome" >
  
    //       {/* <Stack.Screen name="Login" component={Login}  options={{
    //        headerShown: false}} />
    //       <Stack.Screen name="Registration" component={Registration}   options={{ */}
    //        {/* headerShown: false}}/> */}
    //       <Stack.Screen name="TabNavigation" component={Tabnavigation}  options={{
    //        headerShown: false}} />
    //       <Stack.Screen name="Manu" component={Manu}   options={{
    //        headerShown: false}}/>
    //       <Stack.Screen name="Cart" component={Cart}  options={{
    //        headerShown: false}}/>
    //       <Stack.Screen name="Products" component={Products}  options={{
    //        headerShown: false}}/>
    //       <Stack.Screen name="Checkout" component={Checkout} options={{
    //        headerShown: false}} />
    //        {/* <Stack.Screen name="Welcome" component={Welcome}  options={{
    //        headerShown: false}}/>  */}
  
    //     </Stack.Navigator>
      
    
    //   </NavigationContainer>
    // )
  
    return (
   
      <NavigationContainer >
      
        <Stack.Navigator initialRouteName="Welcome" >
  
          <Stack.Screen name="Login" component={Login}  options={{
           headerShown: false}} />
          <Stack.Screen name="Registration" component={Registration}   options={{
           headerShown: false}}/>
          <Stack.Screen name="TabNavigation" component={Tabnavigation}  options={{
           headerShown: false}} />
          <Stack.Screen name="Manu" component={Manu}   options={{
           headerShown: false}}/>
          <Stack.Screen name="Cart" component={Cart}  options={{
           headerShown: false}}/>
          <Stack.Screen name="Products" component={Products}  options={{
           headerShown: false}}/>
          <Stack.Screen name="Checkout" component={Checkout} options={{
           headerShown: false}} />
           <Stack.Screen name="Welcome" component={Welcome}  options={{
           headerShown: false}}/> 
  
        </Stack.Navigator>
      
    
      </NavigationContainer>
    )
  }





