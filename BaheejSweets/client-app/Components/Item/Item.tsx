
import { StyleSheet, Text as RNTXT, View, Button, TextInput,SafeAreaView, FlatList, ImageBackground,Image } from 'react-native';
import { BlurView } from 'expo-blur';
const bg = require('../../assets/Notepad.png')
export function Item(){
    return(
        <BlurView
             // Note: `blurAmount` is available in expo-blur but not in @react-native-community/blur.
             tint='light'
             intensity={10}
            style={styles.wrapper}
        >
            <View style={styles.imageWrapper}>
                
            <Image source={bg} style={styles.image} />
                
            </View>
            <View style={styles.itemInfo}>
                <RNTXT>Item name here</RNTXT>
                <RNTXT>25 NIS</RNTXT>
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
        height:"auto",
        width:"55%",
        alignItems:'center',
        justifyContent:'center',
        padding:"4%"
    },
    imageWrapper:{
        alignItems:"center",
        justifyContent:"center",
        height:"65%",
        width:"100%",
        overflow:'hidden'
    },
    image:
    {
    },
    itemInfo:{
        flexDirection:"row",
        flex:1,
        justifyContent:"space-between",
        width:'100%',
        marginTop:'2%'
    },
})