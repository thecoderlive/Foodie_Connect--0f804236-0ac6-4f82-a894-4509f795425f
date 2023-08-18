import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Menu from './Menu'
import Order from './Order'
import Rating from './Rating'
import Payment from './Payment'
import Sharing from './Sharing'
import Tracking from './Tracking'

const Root = createStackNavigator()

export default function App() {
return (
<NavigationContainer>
<Root.Navigator
    initialRouteName="Menu"
    screenOptions={{
        headerMode:'screen',
        headerStyle: { backgroundColor: 'whitesmoke', height: 40 },
        title: null,
        cardOverlayEnabled:true,
        cartStyle:{flex:1},
        animationEnabled:true,
        gestureEnabled:true
    }}
    >
<Root.Screen name="Menu" component={Menu} />
<Root.Screen name="Order" component={Order} />
<Root.Screen name="Rating" component={Rating} />
<Root.Screen name="Payment" component={Payment} />
<Root.Screen name="Sharing" component={Sharing} />
<Root.Screen name="Tracking" component={Tracking} />
</Root.Navigator>
<Text style={{height: 1}}>.</Text>
</NavigationContainer>
)}

const styles = StyleSheet.create({
  screen: {
    marginTop: 40,
    alignItems: 'center',
  },
})