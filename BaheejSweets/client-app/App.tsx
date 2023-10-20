import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from './Types/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

const BottomTab = createBottomTabNavigator<RootStackParamList>();
const TopTab = createMaterialTopTabNavigator<RootStackParamList>();

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

function HomeTopTabNavigator({navigation}:HomeScreenProps) {
  return (
    <TopTab.Navigator>
      <TopTab.Screen 
        name="Home"
        component={HomeScreen} 
        listeners={{
          focus: () => {
            
          }
        }}
      />
      <TopTab.Screen 
        name="Details" 
        component={DetailsScreen} 
        listeners={{
          focus: () => {
            
          }
        }}
      />
    </TopTab.Navigator>
  );
}

function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ backgroundColor: "magenta", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Grove Street Home!</Text>
      <Button 
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ backgroundColor:"cyan", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
      <BottomTab.Screen 
    name="Home" 
    component={HomeTopTabNavigator}
    options={{ 
        headerTitle: () => (
            <TextInput
                style={{ 
                    height: 40, 
                    borderColor: 'blue', 
                    borderWidth: 1, 
                    width: '380%', 
                    borderRadius: 7,
                    paddingLeft: "10%",  // Adjust this value as needed.
                }}
                placeholder="Search..."
            />
        ),
    }}
/>

<BottomTab.Screen name="Details" component={DetailsScreen} />
</BottomTab.Navigator>
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
})