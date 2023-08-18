import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'



function FoodItems({ item, navigation }){

const onPressAddToCart = () => {}

function foodItemsItem({ item }){
return (
<View style={styles.food_items_item}>
<Image
    style={styles.food_image}
    source={{uri: item.food_image}}
    />
<View style={{flexDirection: 'row'}}>
<Text style={styles.food_name} numberOfLines={1}>{item.food_name}</Text>
<Text style={styles.food_price} numberOfLines={1}>{item.food_price}</Text>
</View>
<TouchableOpacity  onPress={onPressAddToCart}>
    <View style={styles.add_to_cart}>{'Add To Cart'}</View>
</TouchableOpacity>
</View>
)}

return (
<FlatList
    style={styles.food_items}
    data={item}
    renderItem={foodItemsItem}
    keyExtractor={item => item.id}
    showsVerticalScrollIndicator={false}
    />
)}

export default FoodItems;

const styles = StyleSheet.create({
    "food_image": {
        "width": "100vw",
        "height": "100vw",
        "marginTop": 5
    },
    "food_name": {
        "flex": 1,
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "fontWeight": "400",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "food_price": {
        "flex": 1,
        "color": "hsl(274,100%,60%)",
        "fontSize": 15,
        "fontWeight": "400",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "add_to_cart": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    }
});