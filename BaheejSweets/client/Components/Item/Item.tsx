import React, { ReactNode } from 'react'
import { StyleSheet, Text as RNTXT, View, Button, TextInput,SafeAreaView, FlatList, ImageBackground,Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { ItemDisplay } from '../../Types/ItemDisplay';
const bg = require('../../assets/Notepad.png')
interface IImage {
    name: string;
    path: number;
  }
export class BackgroundImage {
    public static images: Array<IImage> = [
      {
        name: 'Croissant',
        path: require('../../assets/Croissant.png'),
      },
      {
        name: 'donut',
        path:require('../../assets/donut.png')
      },
      {
        name: 'chocball',
        path: require('../../assets/chocball.png')
      },
    ];
    public static GetImage = (name: string) => {
      const found = BackgroundImage.images.find(e => e.name === name);
      if(found){
        return found.path
      }
      else{
        return bg
      }
    };
  }
export function Item(display:ItemDisplay): ReactNode {
    // Add a type check to make sure that the imageName parameter is a string.
    const [name,price,imageName]=[display.name,display.price,display.imageName]
    if (typeof imageName !== 'string') {
      throw new Error('The imageName parameter must be a string.');
    }
    const img= BackgroundImage.GetImage(imageName)
    if(!img){
        alert("No image found")
    }
    /**
     * *When adding an image if it is bigger than the rest of the component make sure that the component may need to be resized again to fit them all
     */
    return (
      <BlurView
        tint='default'
        intensity={10}
        style={styles.wrapper}
        
      >
        <View style={styles.imageWrapper}>
          <Image source={img} resizeMode='contain' style={{ marginTop: 0, width: '80%', height: '80%' }} />
        </View>
  
        <View style={styles.itemInfo}>
          <RNTXT>{name && name !== '' ? name : 'Item name is not defined'}</RNTXT>
          <RNTXT>{price && price > 0 ? price.toString() : 'Price failed to render'}</RNTXT>
        </View>
      </BlurView>
    );
  }
  const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.27)',
        height: 350,
        width: 350,
        alignItems: 'center',
        borderRadius: 30,
        borderBlockColor:'rgba(255,255,255,0.27)',
        marginVertical: "2.5%",  // reduced margin for top and bottom
        zIndex: 0,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 0,
        elevation: 5,
        overflow:'hidden',
    },
    imageWrapper: {
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
        zIndex: 1,
    },
    itemInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '70%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#D3D3D3',
        zIndex: 1,
        alignItems: "center",  // center the text elements vertically
    },
});
