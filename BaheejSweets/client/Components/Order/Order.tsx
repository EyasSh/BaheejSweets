import React from 'react';
import Svg, { Rect, SvgXml } from 'react-native-svg';
import { StyleProp, ViewStyle,StyleSheet } from 'react-native';
import { View } from 'react-native';


interface OrderProps {
  height?: string | number;
  width?: string | number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  viewBox?:string,
}

export const Order: React.FC<OrderProps> = ({ height = "100%", width = "50%", style, children }) => {
  return (
    <View style={styles.wrapper}>

    </View>
  );
};
const styles= StyleSheet.create({
    wrapper:{
    },
  })