import React, { useState, useEffect, useReducer } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'

import { actionCreators, initialState, reducer } from './reducer'
import { api } from './api'
import { data } from './data'
import * as items from './rating_data'


function Rating({ navigation, route }){ 
const url = (api.rating ?? "rating/") + (route?.params?.id ?? '')
const [state, dispatch] = useReducer(reducer, initialState)

const { item, history, loading, error } = state

const [valueRatingComment, onChangeRatingComment] = useState('')
const onPressSubmitRating = () => {}

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
<ScrollView style={styles.rating} showsVerticalScrollIndicator={false}>
<View style={{flexDirection: 'row'}}>
{<View
    style={[styles.back,{ backgroundColor: item.back ? 'red' : 'black' }]}
   />}
<Text style={styles.restaurant_name}>{item.restaurant_name}</Text>
</View>
<TextInput style={styles.rating_comment} value={valueRatingComment} onChangeText={onChangeRatingComment} placeholder={'Rating Comment'} />
<Image
    style={styles.rating_stars}
    source={{uri: item.rating_stars}}
    />
<TouchableOpacity  onPress={onPressSubmitRating}>
    <View style={styles.submit_rating}>{'Submit Rating'}</View>
</TouchableOpacity>
</ScrollView>
)}

export default Rating;

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
    "rating_comment": {
        "flex": 1,
        "fontSize": 15,
        "fontWeight": "400",
        "padding": 10,
        "margin": 5,
        "backgroundColor": "whitesmoke"
    },
    "rating_stars": {
        "width": "100vw",
        "height": "100vw",
        "marginTop": 5
    },
    "submit_rating": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    }
});