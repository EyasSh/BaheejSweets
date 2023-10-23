
import { StyleSheet, Text as RNTXT, View, Button, TextInput,SafeAreaView, FlatList, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
export function Item(){
    return(
        <BlurView
             // Note: `blurAmount` is available in expo-blur but not in @react-native-community/blur.
             tint='light'
             intensity={10}
            style={styles.wrapper}
        >
            <View style={styles.imageWrapper}>
                
                  <ImageBackground  />
                
            </View>
        </BlurView>
    );
}
const styles =  StyleSheet.create({
    wrapper: {
        backgroundColor: 'rgba(255,255,255,0.6)',   // Translating the background color
        borderWidth: 1,                             // Translating the border width
        borderColor: 'rgba(255,255,255,0.3)',       // Translating the border color
        // Unfortunately, React Native doesn't support backdrop-filter directly. 
        // You might need a third-party library or some workaround for that.
        height:"20%",
        width:"50%"
    }
    ,
    imageWrapper:{
        alignItems:"center",
        justifyContent:"center"
    },
    image:
    {

    },
})