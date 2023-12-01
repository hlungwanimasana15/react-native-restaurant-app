import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ImageBackground, Image, Card } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import FoodItem from '../Compounents/FoodItem';
import { db } from '../firebase';
import { collection, getDocs, query, where, } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';



const HomeScreen = () => {

  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  const images = [
    { id: '1', source: require('../assets/1192.jpg'), title: 'Delicious double cheese burger' },
    { id: '2', source: require('../assets/18613.jpg'), title: 'korean fried chicken' },
    { id: '3', source: require('../assets/90328.jpg'), title: 'Orange moonshine' },
    { id: '4', source: require('../assets/2150777649.jpg'), title: 'Pork Belly' },
    { id: '4', source: require('../assets/AdobeStock_232336716_Preview.jpeg'), title: 'Salmon rolls and maki sushi' },
    
  ];

  
    const renderItem = ({ item }) => (
      <ImageBackground source={item.source} style={styles.backgroundImage}>
        <View style={styles.card}>
          <Text style={styles.cardText}>{item.title}</Text>
        </View>
      </ImageBackground>
    );
    

    //get items information
    const fetchFoodItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const foodItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(foodItems);
        console.log("Items data:", foodItems);
      } catch (error) {
        console.log("Failed to fetch data", error);
      }
    }

    useEffect(() => {
      fetchFoodItems()
    }, [])

    return (
      <SafeAreaView style={styles.container} >
        <View style={styles.Scrollview}>
          <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 0,
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}

          >
            <StatusBar />

              <View style={styles.headerText}>
               <View
               style={{width:"80%", justifyContent:"flex-start"}}
               ><Text style={styles.headerTitle}>The Mills Restuarent </Text></View>
               <View
               style={{width:"20%", alignItems:"flex-end"}}
               >
                <MaterialIcons name="favorite-border" size={32} color="black" style={{marginRight:20}}/></View>
              </View >
            
            {/* Categories */}
            <View  style={styles.Categoty}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.manu}
              >

                <TouchableOpacity style={styles.categoryButton}   underlayColor="black" onPress={() => navigation.navigate('Desserts')}>
                  <Image source={require('../assets/icecream.png')} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>Desserts</Text>
                </TouchableOpacity>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={true}>

                  <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('Maincourse')}>
                    <Image source={require('../assets/main.png')} style={styles.categoryImage} />
                    <Text style={styles.categoryText}>Main Course</Text>
                  </TouchableOpacity>
                </ScrollView>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={true}>
                  <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('Beverages')}>
                    <Image source={require('../assets/drink.png')} style={styles.categoryImage} />
                    <Text style={styles.categoryText}>Beverages</Text>
                  </TouchableOpacity>
                </ScrollView>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={true}>
                  <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('Starters')}>
                    <Image source={require('../assets/olives.png')} style={styles.categoryImage} />
                    <Text style={styles.categoryText}>Starters</Text>
                  </TouchableOpacity>
                </ScrollView>
              </ScrollView>
            </View>

            {/* image slider */}
            <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'times-new-roman',paddingBottom:'auto',color:'#ffa726'}}>New on our manu</Text>
            </View>
            <View style={styles.slider}>
                
                <FlatList
                  data={images}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  renderItem={renderItem}
                />
              
              <Text style={{ paddingTop: 15, fontSize: 20, fontWeight: 'bold', fontFamily: 'times-new-roman',color:'orange' }}>The manu</Text>

            </View>


            {items.length > 0 && items.map((item, index) => {
              return (
                <FoodItem
                  key={index}
                  name={item.name}
                  price={item.price}
                  volume={item.volume}
                  image={item.image}
                  item={item}
                />
              )

            })}

          </ScrollView>
        </View>
      </SafeAreaView >
    )
  }

  export default HomeScreen

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: 90,
    },
    Video: {
      width: 300,
      height: 200,
      borderRadius: 10,
    },
    backgroundImage: {
      width: 350, 
      height: 350, 
      resizeMode: 'cover',
      marginRight: 10, 
    },
    manu: {
      paddingTop: 15,
      height: 95,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      paddingVertical: 15,
      padding: 10,
      paddingHorizontal: 29,
      marginRight: 2, borderRadius: 20,
      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: { width: 0, height: 2 }
    },
    Scrollview: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'center',
      marginRight: 0,
      marginLeft: 20,
      marginTop: -50,
      marginBottom: -50
    },
    categoryText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginHorizontal: 10,
      color: 'black',
      textAlign: 'center',
    },
    categoryButton: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      marginHorizontal: 5,
      marginRight: 10,
      textAlign: 'center',
      borderColor: 'orange', // Set the border color to orange
      borderWidth: 1, // Se
    },
    categoryImage: {
      width: 35,
      height: 30,
      resizeMode: 'contain',
      paddingLeft: 90
    },
    header: {
      fontSize: 70,
      color: 'blue',
      width: '100%',
    },
    head: {
      width: "100%",
      haight: 50
    },
    headImg: {
      width: '100%',
      height: '100%'
    },
    headerTitle: {
      
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: 'times-new-roman',
      // justifyContent: 'center',
      // alignItems: 'center',
      borderColor: '#ffa726',
      color:'orange'
    },
    slider: {
      paddingTop: 40,
    },
    Card: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
      padding: 20,
      borderRadius: 10,
      margin: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    cardText: {
      color: 'white',
      fontSize: 18,
    },
    table: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: 'black',
    },
    row: {
      flexDirection: 'row',
    },
    cell: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
    },
    verticalLine: {
      width: 1,
      backgroundColor: 'black',
    },
    Rates: {
      flexDirection: 'row',
    },
    RatesText: {
      fontSize: 15,
      color: 'white'
    },
    headerText:{
      // justifyContent: 'center',
      // alignItems: 'center',
      borderColor: 'orange',
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      paddingBottom: 5,
      width: '100%',
      display:'flex',
      flexDirection:'row'
     
    },
    sliderHeading:{
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'times-new-roman',
      paddingTop: 2,
  },
  card:{
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  Categoty:{
 paddingTop:'20px'
  }


  })