
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


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

 function HomeStack() {

  return (
   
        
      <Stack.Navigator initialRouteName="Login"
      options={{ headerShown: false}} >
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Manu" component={Manu} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    
  

  );

}
export default function Navigation() {
  return (
   
    <NavigationContainer >
      <Tab.Navigator
        initialRouteName="Login"
        tabBarOptions={{
          activeTintColor: 'red', 
          inactiveTintColor: '#f3b1a9', 
          headerShown: false,
          style: { backgroundColor: 'black' },
        }}

      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={35} color="#f38d8d" />
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
              <Ionicons name="ios-cart-outline" size={40} color="#f38d8d" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle-sharp" size={40} color="#f38d8d" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}



