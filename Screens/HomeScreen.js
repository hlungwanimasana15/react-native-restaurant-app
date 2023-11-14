import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ImageBackground, Animated, Image,Card} from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import FoodItem from '../Compounents/FoodItem';
import { db } from '../firebase';
import { collection, getDocs, query, where, } from 'firebase/firestore';
import { Video } from 'expo-av';


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
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{
            paddingBottom: 0,
            flexWrap: 'wrap', flexDirection: 'row',
          }}

        >
          <StatusBar />
          <View style={styles.header}>
            <ImageBackground
              source={require('../assets/black.jpg')}
              style={styles.backgroundImage}
            >
              < View style={{ paddingTop: 40, }}>
                <View >
                  <Text style={{ color: 'white', fontSize: 27, fontFamily: 'Times New Roman', alignSelf: 'flex-end' }} > Explore your pallete{'\n'} with us</Text>
                </View>

                <View style={styles.card}>
                  <Video
                    source={require('../assets/hun.mp4')}
                    style={styles.Video}
                    rate={1.0}
                    volume={1.0}
                    isMuted={true}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                  />
                </View>
              </View>
              {/* <ScrollView
                horizontal
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{
                  paddingBottom: 0,
                  flexWrap: 'wrap', flexDirection: 'row',
                }}

              > */}
                {/* <View style={styles.head}>
                  <Image style={styles.headImg} source={require('../assets/2nd.jpg')} />
                </View>
                <View style={styles.head}>
                  <Image style={styles.headImg} source={require('../assets/2nd.jpg')} />
                </View>
                <View style={styles.head}>
                  <Image style={styles.headImg} source={require('../assets/2nd.jpg')} />
                </View><View style={styles.head}>
                  <Image style={styles.headImg} source={require('../assets/2nd.jpg')} />
                </View><View style={styles.head}>
                  <Image style={styles.headImg} source={require('../assets/2nd.jpg')} />
                </View>
             */}
              {/* </ScrollView> */}

            </ImageBackground>
          </View>


          {/* Categories */}
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.manu}
            >

              <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('Desserts')}>
                
                <Text style={styles.categoryText}>Desserts</Text>
              </TouchableOpacity>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}>

                <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('Maincourse')}>
                  <Text style={styles.categoryText}>Main Course</Text>
                </TouchableOpacity>
              </ScrollView>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}>

                <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('Beverages')}>
                  <Text style={styles.categoryText}>Beverages</Text>
                </TouchableOpacity>
              </ScrollView>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}>
                <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('Starters')}>
                  <Text style={styles.categoryText}>Starters</Text>
                </TouchableOpacity>
              </ScrollView>
            </ScrollView>
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
    paddingTop: 30,

  },

  Video: {
    width: 300,
    height: 200,
    borderRadius: 10,

  },
  manu: {

    paddingTop: 15,
    height: 85,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    padding: 16,
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
    // marginTop:-50
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
    color: 'white'
  },
  categoryButton: {
    backgroundColor: '#b37438',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryImage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    width: 35,
    height: 30,
    resizeMode: 'contain',
  },
  header: {
    width: '100%',
    marginLeft: -10,
    zIndex: 20
  },
  head:{
    width:"100%",
    haight:50
  },
  headImg:{
    width:'100%',
    haight:'100%'
  }

})