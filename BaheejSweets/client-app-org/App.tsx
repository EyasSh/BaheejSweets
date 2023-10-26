import { StatusBar } from 'expo-status-bar';
import { useState,useEffect,useRef} from 'react';
import { Order } from './Components/Order/Order';
import { StyleSheet, Text as RNTXT, View,ScrollView, Button, TextInput,SafeAreaView, FlatList } from 'react-native';
import { NavigationContainer ,ParamListBase,Route, useIsFocused, useNavigation,useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from './Types/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialTopTabBar, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Text } from 'react-native-svg';
import { Item } from './Components/Item/Item';
import DeviceInfo from 'react-native-device-info'; //*future use for any device information
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenOrientationInfo } from 'expo-screen-orientation'; //*This is for good component rendering in portrait and landscape

//*go to your semi final convo with bard to see use


const Stack = createStackNavigator<RootStackParamList>();



type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

const TopTab = createMaterialTopTabNavigator<RootStackParamList>();
/**
 * *a top Tab with a search bar for the headerHosts the Navigator between the components
 *
 *  @returns React Component
 */
function TopTabWithHeader() 
{ 
  const [currentScreen, setCurrentScreen] = useState("Home");
  
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeTabs" 
        children={() => <HomeTopTabNavigator />}
        options={{ 
          headerTitle: () => <View style={{ height: 0, width: 0 }}></View>,
          headerRight: () => (
            <View style={{width: '90%', alignItems: 'center'}}>
              <TextInput
                style={styles.search}
                placeholder="Search..."
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function HomeTopTabNavigator({ onTabChange }:any) {
  // Instead of useRoute(), use useNavigation()
  //*This manages the onChange event and Lifts up the state to the StackNav in toptabwithheader do not remove the navigator and the use effect 
 

  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'magenta',       // Notice the change here
        tabBarInactiveTintColor: 'cyan',    // Color for the inactive tab labels
        tabBarIndicatorStyle: {
        backgroundColor: 'magenta',     // Color of the active tab indicator
        height: 2,
        zIndex:3                   // Height of the active tab indicator
      },
      tabBarLabelStyle: {
        fontWeight: 'bold'  // Set font weight to bold
      }
      
    }}
    
    >
      <TopTab.Screen 
        name="Home"  
        component={HomeScreen} 
        options={{title:"Home"}}
      />
      <TopTab.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{title:"Details"}}
      />
    </TopTab.Navigator>
  );
}
type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};
//*In both the home and details screen is focused is utilized to see if the tab is focused on or not
// @ returns The hook isFocused returns a bool
function HomeScreen({ navigation }: HomeScreenProps) {
  const isFocused= useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log("Home")
    }
  }, [isFocused]);
  //TODO Important. Using SVG's is a waste as they tend not to work use pngs instead
  return (
    <LinearGradient style={styles.linearGradient}  colors={["#474bff", "#bc48ff"]}start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 0.5}}>
        <ScrollView style={styles.home}  contentContainerStyle={{minHeight:'300%',alignItems: 'center', justifyContent: 'center'}}>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
          </ScrollView>
    </LinearGradient>
        
    
          
    
    
  );
}

function DetailsScreen() {
  const isFocused= useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log("Details")
    }
  }, [isFocused]);
  return (
    <View style={styles.details}>
      
      
        <RNTXT>
          Fuck The Police
        </RNTXT>
      
      
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <TopTabWithHeader />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  home:{
    flex: 1,
    padding:0,
    overflow:'hidden',
    scrollbarStyle: 'outside-overlay-right',
  },
  details:{
    backgroundColor:"cyan",
    height:'auto', 
    flex: 1, 
    alignItems: 'center', 
    overflow:'visible'
  },
  search:
  { height: 40, 
    borderColor: 'gray', 
    borderWidth:1, 
    width: '90%', 
    paddingRight:"3%", 
    paddingLeft:"3%", 
    marginRight:"25%"
  },
  coco:{
    marginLeft:"5%"
  },
});