import React, { ReactNode } from 'react'
import { StyleSheet, Text as RNTXT, View, Button, TextInput,SafeAreaView, FlatList, ImageBackground,Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ItemDisplay } from '../../Types/ItemFetcher';
const bg = require('../../assets/Notepad.png')
interface IImage {
    name: string;
    path: number;
  }
  export class BackgroundImage {
    private static images: Array<IImage> = [
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
      return found ? found.path : undefined;
    };
  }
export function Item(display:ItemDisplay): ReactNode {
    // Add a type check to make sure that the imageName parameter is a string.
    const [name,price,imageName]=[display.name,display.price,display.imageName]
    if (typeof imageName !== 'string') {
      throw new Error('The imageName parameter must be a string.');
    }
    const img= BackgroundImage.GetImage(imageName) ||bg
    if(!img){
        alert("No image found")
    }
    /**
     * *When adding an image if it is bigger than the rest of the component make sure that the component may need to be resized again to fit them all
     */
    return (
      <BlurView
        tint='light'
        intensity={10}
        style={styles.wrapper}
        blurReductionFactor={100}
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
        overflow: 'hidden',
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.6)',
        height: 350,
        width: 350,
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: "2.5%",  // reduced margin for top and bottom
        zIndex: 1,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
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
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#D3D3D3',
        zIndex: 1,
        alignItems: "center",  // center the text elements vertically
    },
});
