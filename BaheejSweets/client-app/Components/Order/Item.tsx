import { StyleSheet, Text as RNTXT, View, Button, TextInput,SafeAreaView, FlatList, ImageBackground } from 'react-native';
export function Item(){
    return(
        <View>
                <ImageBackground 
                    source={require('../../Images/ItemChockBar.png')}

                >
                  <RNTXT>Nothing</RNTXT>
                </ImageBackground>
        </View>
    );
}