import React, { useState, useEffect, useReducer } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'

import { actionCreators, initialState, reducer } from './reducer'
import { api } from './api'
import { data } from './data'
import * as items from './payment_data'


function Payment({ navigation, route }){ 
const url = (api.payment ?? "payment/") + (route?.params?.id ?? '')
const [state, dispatch] = useReducer(reducer, initialState)

const { item, history, loading, error } = state

const [valueCardNumber, onChangeCardNumber] = useState('')
const [valueExpirationDate, onChangeExpirationDate] = useState('')
const [valueCvv, onChangeCvv] = useState('')
const onPressPay = () => {}

async function getItem() {
      dispatch(actionCreators.loading())

      try {
        if (url in history){
           dispatch(actionCreators.local(history[url]))
        } else if (url.indexOf('http') > -1){
          const response = await fetch(url)
          const json = await response.json()
          if(json){
            dispatch(actionCreators.success(route.params?.id ? json : json[0], url))
          }   
        } else {
          const json = route.params?.id ? data[route.params?.id] : items.item
          dispatch(actionCreators.success(json, url))
        }
      } catch (e) {
        dispatch(actionCreators.failure())
      }
    }

useEffect(() => {
    getItem();
}, []);
  
if (loading) {
    return (
        <View style={styles.center}>
        <ActivityIndicator animating={true} />
        </View>
    )
}

return(
<ScrollView style={styles.payment} showsVerticalScrollIndicator={false}>
<View style={{flexDirection: 'row'}}>
{<View
    style={[styles.back,{ backgroundColor: item.back ? 'red' : 'black' }]}
   />}
<Text style={styles.restaurant_name}>{item.restaurant_name}</Text>
</View>
<View style={{flexDirection: 'row'}}>
<Text style={styles.total_price} numberOfLines={1}>{item.total_price}</Text>
<TextInput style={styles.card_number} value={valueCardNumber} onChangeText={onChangeCardNumber} placeholder={'Card Number'} />
</View>
<TextInput style={styles.expiration_date} value={valueExpirationDate} onChangeText={onChangeExpirationDate} placeholder={'Expiration Date'} />
<TextInput style={styles.cvv} value={valueCvv} onChangeText={onChangeCvv} placeholder={'Cvv'} />
<TouchableOpacity  onPress={onPressPay}>
    <View style={styles.pay}>{'Pay'}</View>
</TouchableOpacity>
</ScrollView>
)}

export default Payment;

const styles = StyleSheet.create({
    "center": {
        "flex": 1,
        "justifyContent": "center",
        "alignItems": "center"
    },
    "back": {
        "width": 30,
        "height": 30,
        "borderRadius": 20,
        "marginTop": 5
    },
    "restaurant_name": {
        "fontSize": 12,
        "fontWeight": "250",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "total_price": {
        "flex": 1,
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "fontWeight": "400",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "card_number": {
        "flex": 1,
        "fontSize": 15,
        "fontWeight": "400",
        "padding": 10,
        "margin": 5,
        "backgroundColor": "whitesmoke"
    },
    "expiration_date": {
        "flex": 1,
        "fontSize": 15,
        "fontWeight": "400",
        "padding": 10,
        "margin": 5,
        "backgroundColor": "whitesmoke"
    },
    "cvv": {
        "flex": 1,
        "fontSize": 15,
        "fontWeight": "400",
        "padding": 10,
        "margin": 5,
        "backgroundColor": "whitesmoke"
    },
    "pay": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    }
});