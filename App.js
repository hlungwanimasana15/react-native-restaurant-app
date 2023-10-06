
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Screens/Login';
import HomeScreen from './Screens/HomeScreen';
import Registration from './Screens/Registration'
import Manu from './Screens/Manu';
import Cart from './Screens/Cart'
import Products from './Screens/Products';
import Notificatio from './Screens/Notificatio';
import { Ionicons } from '@expo/vector-icons';
import Profile from './Screens/Profile';
import { store } from './app/store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

 function HomeStack() {

  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName='Login' 
      options={{ headerShown: false}}  >
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Manu" component={Manu} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Products" component={Products} />
      </Stack.Navigator>
      </Provider>

  );

}
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: 'red', 
          inactiveTintColor: '#f3b1a9', 
          headerShown: false,
        }}
        
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={35} color="#79460e" />
            ),
            headerShown: false,
            
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notificatio}
          options={{
            tabBarLabel: 'Notification',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-notifications-outline" size={30} color="#79460e" />
            ),
          }}
        />
         <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-cart-outline" size={40} color="#79460e" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'profile',
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle-sharp" size={40} color="#79460e" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


