
import { StyleSheet, Text as RNTXT, View, Button, TextInput,SafeAreaView, FlatList, ImageBackground,Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const bg = require('../../assets/Notepad.png')
export function Item(){
    return(
    
        <BlurView
            
             // Note: `blurAmount` is available in expo-blur but not in @react-native-community/blur.
             tint='light'
             intensity={10}
            style={styles.wrapper}  
            blurReductionFactor={100}
            >
            <View style={styles.imageWrapper}>
                 <Image source={bg} />
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
        overflow:'hidden',
        flex:1,
        flexDirection:'column',
        gap: 70,
        backgroundColor: 'rgba(255,255,255,0.6)',   //* Translating the background color
        borderWidth: 0,                             //* Translating the border width
        borderColor: 'rgb(255,255,255)',       //* Translating the border color
        //* Unfortunately, React Native doesn't support backdrop-filter directly. 
        //* You might need a third-party library or some workaround for that.
        height:'auto',
        width:'90%',
        alignItems:'center',
        justifyContent:"center",
        borderRadius:30,
        marginTop:"7.5%",
        marginBottom:'7.5%',
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
        alignItems:"center",
        justifyContent:'center',
        marginTop:'auto',
        height:"50%",
        width:"100%",
        zIndex:1,
        
    },

    itemInfo:{
        flexDirection:"row",
        flex:0,
        justifyContent:"space-between",
        marginTop:'1%',
        width:'70%',
        height:"auto",
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor:'#D3D3D3',
        padding:"0%",
        zIndex:1,
        
    },
})