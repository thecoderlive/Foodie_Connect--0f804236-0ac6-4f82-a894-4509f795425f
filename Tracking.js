import React, { useState, useEffect, useReducer } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'

import { actionCreators, initialState, reducer } from './reducer'
import { api } from './api'
import { data } from './data'
import * as items from './tracking_data'


function Tracking({ navigation, route }){ 
const url = (api.tracking ?? "tracking/") + (route?.params?.id ?? '')
const [state, dispatch] = useReducer(reducer, initialState)

const { item, history, loading, error } = state



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
<ScrollView style={styles.tracking} showsVerticalScrollIndicator={false}>
<View style={{flexDirection: 'row'}}>
{<View
    style={[styles.back,{ backgroundColor: item.back ? 'red' : 'black' }]}
   />}
<Text style={styles.restaurant_name}>{item.restaurant_name}</Text>
</View>
<View style={{flexDirection: 'row'}}>
<Text style={styles.order_status} numberOfLines={1}>{item.order_status}</Text>
<Text style={styles.estimated_delivery_time} numberOfLines={1}>{item.estimated_delivery_time}</Text>
</View>
</ScrollView>
)}

export default Tracking;

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
    "order_status": {
        "flex": 1,
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "fontWeight": "400",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "estimated_delivery_time": {
        "flex": 1,
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "fontWeight": "400",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    }
});