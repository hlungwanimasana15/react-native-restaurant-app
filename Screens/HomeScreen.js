import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { categories, coffeeItems } from '../constants/index'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import FoodItem from '../Compounents/FoodItem';
// import { db } from '../firebase';
//import { doc, setDoc, collection, getDoc } from 'firebase/firestore';
import { Video } from 'expo-av';
import { EvilIcons } from '@expo/vector-icons';

const HomeScreen = () => {

  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState(1);



  //   //get user information
  //   const fetchData = async () => {


  //           try {
  //               const userCollection = collection(db, 'FoodItem');
  //               const userDocRef = doc(userCollection, 'Qs2sOmUDfqHhY18vfsIO');
  //               const userDocSnapshot = await getDoc(userDocRef);
  //               if (userDocSnapshot.exists()) {
  //                   const userData = userDocSnapshot.data();
  //                  console.log('sadasd',userData.category);
  //               } else {
  //                   console.log('Failed to get user infromation')
  //               }

  //           } catch (err) {
  //               console.log(err)
  //           } finally {
  //               setIsLoading(false);
  //           }


  //   }

  //   useEffect(() => {
  //     fetchData()
  // }, [])

  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.main}>

        <StatusBar />

        <View  >

          <ImageBackground
            source={require('../assets/black.jpg')}
            style={styles.backgroundImage}
          >

            < View style={{ pasition: 'absolute', paddingTop: 50, }}>
              <View >
                <Text  style={{ color: 'white',  fontSize: 27,fontFamily: 'Times New Roman', alignSelf: 'flex-end'}} > Explore your pallete{'\n'} with us</Text>
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
          </ImageBackground>
          {/* Categories */}
          <View style={styles.manu} >
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                isActive = item.id == activeCategory;
                let activeTextClass = isActive ? 'text-white' : 'text-gray-700';
                return (
                  <TouchableOpacity
                    onPress={() => setActiveCategory(item.id)}
                    style={styles.categoryStyle}
                  >
                    <Text style={{ fontWeight: 'bold', ...activeTextClass }}>{item.title}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View >
        </View>
      </View>
      <View style={styles.carousel}>
        <ScrollView
          vertical
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 0, flexWrap: 'wrap', flexDirection: 'row', }}
          bounces={true}
        >

          {[coffeeItems, coffeeItems, coffeeItems, coffeeItems].map((item, index) => {
            return (
              <FoodItem
                key={index}
                name={item.name}
                price={item.price}
                volume={item.volume}
                item={item[index]}
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
    // paddingTop: 30,

  },
 
  Video: {
    width: 300,
    height: 200,
    borderRadius: 10,

  },

  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,

  },

  manu: {
    paddingHorizontal: 5,
    marginTop: 5,
    marginBottom: 25,
  },
  categoryStyle: {
    padding: 16,
    paddingHorizontal: 20,
    marginRight: 2, borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 }
  },
  carousel: {
    marginTop: -60,
    paddingTop: 30,


  },


});