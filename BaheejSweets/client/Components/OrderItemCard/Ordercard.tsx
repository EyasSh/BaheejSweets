import React, { ReactNode } from 'react'
import { StyleSheet, Text as RNTXT, View, Button, TextInput,SafeAreaView, FlatList, ImageBackground,Image } from 'react-native';
import { BackgroundImage } from '../Item/Item';
const bg = require('../../assets/Notepad.png')
interface OrderItemProps{
    name:string,
    price:number,
    quantity:number,
    imageName:string
}
export function OrderItem({name,price,quantity,imageName}:OrderItemProps):ReactNode
{
    return(
        <View >

        </View>
    )
}
const styles =StyleSheet.create({

})