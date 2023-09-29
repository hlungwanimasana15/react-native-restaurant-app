import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Manu from './Manu'

const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content"/>

      {/* main */}
      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom:20
      }}/>
      <Manu/>
      <Text className='bg-pink'>nasana</Text>
    </SafeAreaView>

  )
}

export default HomeScreen