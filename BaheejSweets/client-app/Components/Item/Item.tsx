
import { StyleSheet, Text as RNTXT, View, Button, TextInput,SafeAreaView, FlatList, ImageBackground,Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { ScrollView } from 'react-native';
const bg = require('../../assets/Notepad.png')
export function Item(){
    return(
        
        <BlurView
             // Note: `blurAmount` is available in expo-blur but not in @react-native-community/blur.
             tint='light'
             intensity={15}
            style={styles.wrapper}
        >
            <View style={styles.imageWrapper}>
                
            <Image source={bg} />
                
            </View>
            <View style={styles.infoWrapper}>
            <View style={styles.itemInfo}>
                    <RNTXT>Item name here</RNTXT>
                    <RNTXT>25 NIS</RNTXT>
                </View>
            </View>
                
        </BlurView>
       
        
        
        
    );
}
const styles =  StyleSheet.create({
    wrapper: {
        flex:1,
        flexDirection:'column',
        gap: 50,
        backgroundColor: 'rgba(255,255,255,0.6)',   //* Translating the background color
        borderWidth: 1,                             //* Translating the border width
        borderColor: 'rgba(255,255,255,0.3)',       //* Translating the border color
        //* Unfortunately, React Native doesn't support backdrop-filter directly. 
        //* You might need a third-party library or some workaround for that.
        height:"70%",
        width:'auto',
        alignItems:'center',
        justifyContent:"center",
        marginTop:"15%",
        zIndex: 1,
         // iOS shadow properties
         shadowColor: "#000",
        shadowOffset: {
            width: 4,  // shadow to the right
            height: 4,  // shadow to the bottom
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        // * Android elevation property
        elevation: 5
    },
    imageWrapper:{
        marginTop:'10%',
        alignItems:"center",
        height:"55%",
        width:"100%",
        overflow:'visible'
    },
    infoWrapper:
    {
        flex:0,
        alignItems:'center',
        marginTop:'8%',
        marginLeft:'0%',
        marginRight:'0%',
        marginBottom:'0%',
        padding:'0%',
        width:'125%',
        transform:'tra',
        boxShadow: [
            {
                offset: { x: 0, y: 0 },
                blur: 10,
                spread: 0,
                color: '#ffffff',
            },
        ],

    },

    itemInfo:{
        flexDirection:"row",
        flex:0,
        justifyContent:"space-between",
        margin:'2%',
        width:'50%',
        height:"auto",
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor:'#D3D3D3',
        padding:"0%",
        
    },
})