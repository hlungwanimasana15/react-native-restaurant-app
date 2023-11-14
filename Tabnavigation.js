
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './Screens/Cart'
import { Ionicons } from '@expo/vector-icons';
import Profile from './Screens/Profile';
import HomeScreen from './Screens/HomeScreen';



const Tab = createBottomTabNavigator();

const Tabnavigation = () => {
  return (
    
      <Tab.Navigator
      initialRouteName='Home'
        tabBarOptions={{
          activeTintColor: 'black', 
          inactiveTintColor: 'black', 
          headerShown: false,
        
        }}

      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={35} color="black" />
            ),
            headerShown: false,
            
          }}
        />
         <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-cart-outline" size={40} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-person-outline" size={35} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
  
  )
}

export default Tabnavigation