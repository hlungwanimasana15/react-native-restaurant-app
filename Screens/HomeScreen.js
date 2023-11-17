import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ImageBackground, Animated, Image, Card } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import FoodItem from '../Compounents/FoodItem';
import { db } from '../firebase';
import { collection, getDocs, query, where, } from 'firebase/firestore';
import { Entypo } from '@expo/vector-icons';
import image1 from '../assets/1192.jpg';


const HomeScreen = () => {

  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  //get items information
  const fetchFoodItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      const foodItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(foodItems);
      // console.log("Items data:", foodItems);
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

          <View  >
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>The Mills Restuarent</Text>
            </View >
          </View>

        
          {/* Categories */}
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.manu}
            >

              <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('Desserts')}>
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
            
          <View style={styles.Slider}>
          <Text style={{fontSize:20, fontWeight: 'bold',fontFamily: 'times-new-roman',paddingTop:2}}>New on our manu</Text>
            < ScrollView
              // horizontal
              showsHorizontalScrollIndicator={false}
              style={{ paddingTop: 40, }}
            >
            
              <ImageBackground
                source={image1}
                style={styles.backgroundImage}>

                <View style={styles.Card}>
              <Text style={styles.cardText}>Deliciouse double cheese burger</Text>
                </View>

              </ImageBackground>

              {/*<ImageBackground
                source={require('../assets/18613.jpg')}
                style={styles.backgroundImage}
              >
                <View style={styles.card}>
                 
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../assets/90328.jpg')}
                style={styles.backgroundImage}
              >
                <View style={styles.card}>
                  {/* Your content for the second image /}
                </View>
              </ImageBackground> */}

            </ScrollView>
          <Text style={{paddingTop:15,fontSize:20, fontWeight: 'bold',fontFamily: 'times-new-roman',}}>The manu</Text>

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
    height: 300,
    width: '97.9%',
    borderRadius: 30,
  },
  manu: {
    paddingTop: 25,
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
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'times-new-roman',
  },
  Slider: {
    width: '100%',
    paddingTop: -40,
    paddingBottom: 30
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
  Rates:{
    flexDirection: 'row',
  },
  RatesText:{
    fontSize:15,
    color:'white'
  },
  headerText:{
    borderBottomWidth: 1, 
    borderBottomColor: 'black', 
    paddingBottom: 7, 
    width: '100%'
  },

})