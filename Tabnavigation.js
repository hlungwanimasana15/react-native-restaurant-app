
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './Screens/Cart'
import { Ionicons } from '@expo/vector-icons';
import Profile from './Screens/Profile';
import HomeScreen from './Screens/HomeScreen';
import { View, StyleSheet  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


const Tab = createBottomTabNavigator();


const Tabnavigation = () => {

  
  const cartCount = useSelector((state) => state.cart.totalItems);

  return (
      <Tab.Navigator
      initialRouteName='Home'
        tabBarOptions={{
          activeTintColor: 'orange', 
          inactiveTintColor: 'black', 
          headerShown: false,
          
        }}
        style={{ backgroundColor: 'transparent', position: 'absolute', bottom: 0, left: 0, right: 0 }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            
              headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons
               name="home-outline"
                size={35} color="orange" />
            ),
           

          }}
        />
         <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-cart-outline" size={40} color="orange" />
            ),
            tabBarBadge: cartCount > 0 ? cartCount : null,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-person-outline" size={35} color="orange" />
            ),
          }}
        />
      </Tab.Navigator>
 
  )
}

export default Tabnavigation