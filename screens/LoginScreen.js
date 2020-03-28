import * as React from 'react';
import { Image, TextInput, StyleSheet, View, Dimensions, TouchableHighlight, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HomeButton from '../components/HomeButton';

export default function LogIn({navigation}) {

    const submitInfo = () => {
        navigation.navigate('SearchSetup');
    }
    return (
        <View style={styles.container}>
            <ScrollView>
            <View>
              <View
                style={styles.headerImage}
              />

            <Image
                source={
                    require('../assets/images/lightturqbub.png')
                }
                style={styles.headerBubbles}
              />
               
            <HomeButton navigation={navigation}  color="turq"/>

            </View>

         
            <Text style={styles.midText}>
              Welcome.
            </Text>

            <View style={styles.buttonContainer}>
            <TextInput
            secureTextEntry={false}
            placeholder="Username"
            style={styles.textInput}/>
            <TextInput
            secureTextEntry={true}
            placeholder="Password"
            style={styles.textInput}/>
            <TouchableHighlight style={styles.touchStyle} onPress={()=>submitInfo()} >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
            </View>
    
            <Image
                source={
                    require('../assets/images/bubblesgrey.png')
                }
                style={styles.bottomBubble}
            />
            </ScrollView>
        </View>
      );
}

var widthVal = Dimensions.get('window').width; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202020',
    },
    headerImage:{
  
        width:widthVal,
        height:400,
        marginTop:-250,
        backgroundColor:`#47CEB2`,
    },
    headerBubbles:{
        width:100,
        height:120,
        position:`absolute`,
    
    },
    midText:{
        fontSize:80,
        marginTop:-81,
        fontWeight:`bold`,
        marginLeft:5,
        textAlign:`left`,
        color:`#1A1A1A`,
    },
    touchStyle:{
        marginTop:40,
        marginBottom:30,
        backgroundColor:`#FAE99E`,
        borderRadius:8,
        alignItems:`center`,
        justifyContent:`center`,
        padding:5,
        width:200,
        fontSize:100,
        height:60,
      },
      buttonText:{
        fontSize:25,
 
        color:`#202020`,
      },
      bottomBubble:{
        alignSelf:`flex-end`,
      },
      textInput:{
          margin:10,
          padding:10,
          backgroundColor:`#1A1A1A`,
          color:`#47CEB2`,
          fontSize:20,
          width:300,
          height:65,
          borderRadius:8,
      },
      buttonContainer:{
            alignItems: 'center',
            justifyContent: 'center', 
          marginTop:30,
      }
});