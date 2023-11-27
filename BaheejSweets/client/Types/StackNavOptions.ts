import { StackNavigationOptions } from "@react-navigation/stack";

export type StackNav= StackNavigationOptions&{
    isFocused?:boolean
}