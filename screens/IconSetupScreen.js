import * as React from 'react';
import { Alert, Image, StyleSheet,Dimensions, View, TouchableHighlight, Text } from 'react-native';
import HomeButton from '../components/HomeButton';
import * as ImagePicker from 'expo-image-picker';
import Icon from '../components/Icon';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

export default function IconSetupScreen(props) {
  const [url, setURL]=React.useState(null);

  const submitInfo = async() => {
    const user={
      icon:url,
    }

    const config={
        headers: {
          'Authorization': 'BEARER ' + props.TOKEN,
        }
    }

     await axios.post('http://lahacks-hobbyist.tech:3000/user/update',user,config)
    .then((response)=>{
        console.log(response);
    })
    .catch(()=>{
      console.log('Connection error. Please try again later.');
    })
  }

 

  const skip = async() =>{
    await submitInfo();
    props.navigation.navigate('SearchSetup');
  }

  const takePicture = async () => {
    let permissionResult = ImagePicker.requestCameraPermissionsAsync();
    if(permissionResult.granted === false){
        Alert.alert("Permission to camera is required.");
        return;
    }

    let cameraResult = await ImagePicker.launchCameraAsync();
    setURL(cameraResult);
    submitInfo(cameraResult);
  }

  const findPicture= async () =>{
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
        Alert.alert("Permission to access camera roll is required.");
        return;
    }   
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setURL(pickerResult);
    submitInfo(pickerResult);
  }

    return (
        <View style={styles.container}>
            <Image 
              source={
                require('../assets/images/greyabstract-1.png')
              }
            style={styles.headerImage}/>
           
            <HomeButton navigation={props.navigation}  color="turq"/>
          
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
            <Icon url={url}/>
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
              <Text style={styles.buttonText}>></Text>
            </TouchableHighlight>
            </View>
       
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
        marginTop:-180,
        padding:50,
        alignSelf:`center`,
        justifyContent:`center`,
        alignContent:`center`,  
    },
    container: {
    
      flex:1,
        backgroundColor: '#2b2b2b',
        alignContent:`center`,
    },
    headerImage:{
        marginTop:-80,
        elevation: -1,
        width:widthVal,
        height:280,
        marginTop:-80,
        backgroundColor:`#202020`,
        marginBottom:40,
    },
    headerBubbles:{
        width:100,
        height:120,
        position:`absolute`,
        marginTop:25,
    },
    midText:{
        fontFamily:'Nunito',
        fontSize:95,
        marginTop:-145,
        textAlign:`right`,
        marginRight:5,
        color:`#d3d3d3`,
      },
    touchStyle:{
        marginTop:30,
        marginBottom:30,
        backgroundColor:`#47CEB2`,
        borderRadius:50,
        alignItems:`center`,
        justifyContent:`center`,
        padding:5,
        width:70,
        height:70,
      },
      buttonText:{
        fontFamily:'Nunito',
        fontWeight:`bold`,
        fontSize:30,
        color:`#2b2b2b`,
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