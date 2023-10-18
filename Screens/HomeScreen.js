import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { categories, coffeeItems } from '../constants/index'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import FoodItem from '../Compounents/FoodItem';
import { db } from '../firebase';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore';

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
    <View style={styles.container} >

      <StatusBar />
      <View style={{ flex: 1 }} >
        < View style={{ pasition: 'absolute', left: 0, right: 0, top: 0 }}>
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
          <Image source={require('../assets/element.jpg')}
            style={styles.Image}

          />
          <SafeAreaView  >

            <View style={styles.header} >
              <View style={styles.maps} >
                <Text style={styles.location}></Text>
              </View>
            </View>
          </SafeAreaView >
        </ View>

      </View>
      <View style={styles.carousel}>
        <ScrollView
          vertical
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 30, flexWrap: 'wrap', flexDirection: 'row', }}
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
    </View >

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Image: {
    width: '100%',
    position: 'relative',
    top: -15,
    height: '60%',
    resizeMode: 'center',
  },
  header: {

    marginHorizontal: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -8,
    marginTop: -25,

  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,

  },
  maps: {
    flexDirection: 'row',
    marginLeft: 5,
    justifyContent: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: "90%",

  },
  location: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    // fontFamily:'italic',
  },
  manu: {
    paddingHorizontal: 5,
    marginTop: -5,
    marginBottom: 30,


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
    marginBottom: -170,
    paddingTop:30.
    // paddingTop:500,
  },


});