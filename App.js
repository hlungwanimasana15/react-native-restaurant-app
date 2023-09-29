
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import HomeScreen from './Screens/HomeScreen';
import Registration from './Screens/Registration'
import Manu from './Screens/Manu';



const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="registration" component={Registration} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="Manu" component={Manu} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
