import React from 'react';
import Svg, { Rect, SvgXml } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';


interface OrderProps {
  height?: string | number;
  width?: string | number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  viewBox?:string,
}
//TODO Important. Using SVG's is a waste as they tend not to work use pngs instead
const rawSvg = ``

export const Order: React.FC<OrderProps> = ({ height = "100%", width = "50%", style, children }) => {
  return (
    <View></View>
  );
};
