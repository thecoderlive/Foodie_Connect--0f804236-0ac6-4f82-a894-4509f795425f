import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'



function CartItems({ item, navigation }){

const onPressRemoveFromCart = () => {}

function cartItemsItem({ item }){
return (
<View style={styles.cart_items_item}>
<Image
    style={styles.food_image}
    source={{uri: item.food_image}}
    />
<View style={{flexDirection: 'row'}}>
<Text style={styles.food_name} numberOfLines={1}>{item.food_name}</Text>
<Text style={styles.food_price} numberOfLines={1}>{item.food_price}</Text>
</View>
<TouchableOpacity  onPress={onPressRemoveFromCart}>
    <View style={styles.remove_from_cart}>{'Remove From Cart'}</View>
</TouchableOpacity>
</View>
)}

return (
<FlatList
    style={styles.cart_items}
    data={item}
    renderItem={cartItemsItem}
    keyExtractor={item => item.id}
    showsVerticalScrollIndicator={false}
    />
)}

export default CartItems;

const styles = StyleSheet.create({
    "food_image": {
        "width": "100vw",
        "height": "70vw",
        "marginTop": 5
    },
    "food_name": {
        "flex": 1,
        "color": "#f21111",
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
    "remove_from_cart": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#39c4a4",
        "color": "white"
    }
});