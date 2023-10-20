import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from './Types/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<RootStackParamList>();



type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;


const TopTab = createMaterialTopTabNavigator<RootStackParamList>();
function TopTabWithHeader() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeTabs" 
        component={HomeTopTabNavigator}
        options={{ 
          headerTitle: () => <View style={{ height: 0, width: 0 }}></View>,
          headerRight: () => (
            <View style={{width: '90%', alignItems: 'center'}}>
              <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth:1, width: '90%', paddingRight:"3%", paddingLeft:"3%", marginRight:"25%"}}
                placeholder="Search..."
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function HomeTopTabNavigator() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Home" component={HomeScreen} />
      <TopTab.Screen name="Details" component={DetailsScreen} />
    </TopTab.Navigator>
  );
}
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

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
      <TopTabWithHeader />
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
