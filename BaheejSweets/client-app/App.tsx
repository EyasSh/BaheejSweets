import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { useState,useRef,useEffect } from 'react';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={{ backgroundColor:"magenta", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Grove Street Home!</Text>
      
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ backgroundColor:"cyan",flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
         screenOptions={{
          headerStyle: {
            backgroundColor: 'cyan',
          },
          headerTintColor: 'white',  // Changes the color of header text and icons
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
             name="Home" 
             component={HomeScreen} 
              options={{ 
                 title: 'My Home',
                headerRight: () => (
                <Button
                 onPress={() => alert('This is a right button!')}
                title="Right Button"
                color="#FF00FF"
      />
    ),
  }} 
/>

        <Stack.Screen name="Details" component={DetailsScreen} options={{title:"ass"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
