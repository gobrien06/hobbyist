import * as React from 'react';
import { Alert, Image, StyleSheet,Dimensions, View, TouchableHighlight, Text } from 'react-native';
import HomeButton from '../components/HomeButton';
import * as ImagePicker from 'expo-image-picker';

export default function IconSetupScreen({navigation}) {
    const getIcon = () =>{
        //HTTP get request
    }

  const [icon,setIcon] = React.useState(getIcon());

  const submitInfo = () => {
    //HTTP get request
  }

 

  const skip = () =>{
    //HTTP get request
    navigation.navigate('SearchSetup');
  }

  const takePicture = async () => {
    let permissionResult = ImagePicker.requestCameraPermissionsAsync();
    if(permissionResult.granted === false){
        Alert.alert("Permission to camera is required.");
        return;
    }

    let cameraResult = await ImagePicker.launchCameraAsync();
    setIcon(cameraResult);
    submitInfo(cameraResult);
  }

  const findPicture= async () =>{
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
        Alert.alert("Permission to access camera roll is required.");
        return;
    }   
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setIcon(pickerResult);
    submitInfo(pickerResult);
  }

    return (
        <View style={styles.container}>
            <View style={styles.headerImage}/>
           
            <HomeButton navigation={navigation} />
            <Text style={styles.midText}>
            Icon.
            </Text>
            <View style={styles.midContain}>
            <Image 
            source={
                require('../assets/images/Ellipse.png')
            }
            style={
                styles.iconCircle
            }
            style={
                styles.iconStyle
            }
            />
            </View>
          

            <View style={styles.buttonContainer}>
         
            <TouchableHighlight style={styles.imageBtnStyle} onPress={()=>takePicture()} >
              <Image source={
                  require('../assets/images/81b8ec9c3450c00ef1d9dbfc1d6de9d6.png')
              }
              />
            </TouchableHighlight>

            <TouchableHighlight style={styles.imageBtnStyle} onPress={()=>findPicture()} >
              <Image source={
                  require('../assets/images/opening-png-files-13.png')
              }
              />
            </TouchableHighlight>

            <TouchableHighlight style={styles.touchStyle} onPress={()=>skip()} >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableHighlight>
            </View>
         
            <Image
                source={
                    require('../assets/images/bottomturqbub.png')
                }
                style={styles.bottomBubble}
            />
        </View>
      );
}

var widthVal = Dimensions.get('window').width + 10; 

const styles = StyleSheet.create({
    iconCircle:{
        margin:-50,
    },
    imageBtnStyle:{
      marginTop:10,
    },
    midContain:{
        marginTop:-5,
        alignSelf:`center`,
        justifyContent:`center`,
        alignContent:`center`,  
    },
    container: {
      flex:1,
        backgroundColor: '#47CEB2',
        alignContent:`center`,
    },
    headerImage:{
        elevation: -1,
        width:widthVal,
        height:250,
        marginTop:-80,
        backgroundColor:`#FFF`,
    },
    headerBubbles:{
        width:100,
        height:120,
        position:`absolute`,
        marginTop:25,
    },
    midText:{
        fontSize:110,
        marginTop:-115,
        fontWeight:`bold`,
        textAlign:`left`,
        marginLeft:5,
        color:`#47CEB2`,
        marginBottom:20,
    },
    touchStyle:{
        marginTop:30,
        marginBottom:30,
        backgroundColor:`#202020`,
        borderRadius:8,
        alignItems:`center`,
        justifyContent:`center`,
        padding:5,
        width:220,
        height:60,
      },
      buttonText:{
        fontSize:25,
        color:`#47CEB2`,
      },
      bottomBubble:{
        elevation:-1,
        marginTop:-100,
        alignSelf:`flex-end`,
      },
      buttonContainer:{
            alignItems: 'center',
            justifyContent: 'center', 
          marginTop:10,
      }
});