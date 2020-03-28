import * as React from 'react';
import MapView from 'react-native-maps';
import { Alert, Image, StyleSheet,Dimensions, View, TouchableHighlight, Text, Slider } from 'react-native';
import HomeButton from '../components/HomeButton';
import axios from 'axios';

export default function SearchSetupScreen(props) {
  const [range,setRange] = React.useState(20);
  const [longitude, setLongitude] = React.useState();
  const [latitude,setLatitude] = React.useState();
  const [icon, setIcon] = React.useState('https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Fmobile%2F000%2F028%2F232%2Fhamster.jpg');

  const searchStart = async() =>{
    searchMatch();
    submitInfo();
  }

  const searchMatch = async() =>{

  }

  const submitInfo = async() => {
    const user={
      lat:latitude,
      lon:longitude,
      //need to include range
    }
    const config = {
      headers: {
        'Authorization': 'BEARER ' + props.TOKEN,
      }
    }

    console.log(user);
  
   await axios.post('http://lahacks-hobbyist.tech:3000/users/geo',user,config)
    .then((response)=>{
        console.log(response);
      })
    .catch((error)=>{
      console.log(error);
    })
  }

  const getLocation = () =>{
    navigator.geolocation.getCurrentPosition(
        position =>{
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        },
        error => {
            console.log(error.message);
            Alert.alert(error.message);
        } ,
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 2000 }
    )
    console.log("latitude" + latitude);
    console.log("longitude" + longitude);
   
    return;
  }
   
    const getIcon=async()=>{
      await getLocation();

      const config = {
        headers: {
          'Authorization': 'BEARER ' + props.TOKEN,
        }
      }

      await axios.post('http://lahacks-hobbyist.tech:3000/user/icon',config)
      .then((response)=>{
          console.log(response);
          if(response.data.icon){
            setIcon(response.data.icon);
          }
        
        })
      .catch((error)=>{
        console.log(error);
      })
      
    }

    React.useEffect(getLocation, []);

    return (
        <View style={styles.container}>
            <View>
                <MapView 
                region={{
                    latitude:latitude,
                    longitude:longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    onRegionChange:{getLocation}
                }}
                onRegionChange={() => getLocation()}
                zoom={range}
                style={
                    styles.mapCircle
                }/>
               
            <HomeButton navigation={props.navigation} color="turq"/>

            </View>

            <Text style={styles.midText}>
         
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
            <Text style={styles.rangeText}>Range:</Text>
            <Slider maximumValue={100} style={styles.slider} onSlidingComplete={(value) => setRange(value)}/>

            <TouchableHighlight style={styles.touchStyle} onPress={()=>searchStart()} >
              <Text style={styles.buttonText}>Start Searching</Text>
            </TouchableHighlight>
            </View>
         
            <Image
                source={
                    require('../assets/images/bubblesgrey.png')
                }
                style={styles.bottomBubble}
            />
        </View>
      );
}

var widthVal = Dimensions.get('window').width + 10; 

const styles = StyleSheet.create({
    midTouch:{
        elevation:1,
        height:50,
        width:60,
        borderRadius:8,
        marginLeft:220,
        padding:8,
        position:`absolute`,
        backgroundColor:`#FAE99E`,
    },
    mapCircle:{
        elevation:-1,
        alignSelf:`center`,
        height:350,
        borderRadius:8, 
        width:widthVal,
    },
    rangeText:{
        color:`#47CEB2`,
        fontWeight:`bold`,
        fontSize:35,
    },
    slider:{
        height:50,
        width:200,
    },
    iconCircle:{
        alignSelf:`center`,
    },
    imageBtnStyle:{
    },
    midContain:{
        marginTop:65,
        alignSelf:`center`,
        justifyContent:`center`,
        alignContent:`center`,  
    },
    removeButton:{
      elevation:1,
      position:`absolute`,
      height:10,
      width:10,
      fontSize:20,
    },
    container: {
      flex:1,
        backgroundColor: '#202020',
        alignContent:`center`,
    },
    headerImage:{
        elevation: -1,
        width:widthVal,
        height:450,
        marginTop:-80,
    },
    headerBubbles:{
        width:100,
        height:120,
        position:`absolute`,
        marginTop:25,
    },
    midText:{
        fontSize:60,
        marginTop:-260,
        fontWeight:`bold`,
        textAlign:`center`,
        color:`#1A1A1A`, 
        marginBottom:10,
    },
    touchStyle:{
        marginTop:15,
        marginBottom:30,
        backgroundColor:`#47CEB2`,
        borderRadius:8,
        alignItems:`center`,
        justifyContent:`center`,
        padding:5,
        width:240,
        height:60,
      },
      buttonText:{
        fontSize:25,
        color:`#202020`,
      },
      bottomBubble:{
        alignSelf:`flex-end`,
      },
      buttonContainer:{
        alignItems: 'center',
        justifyContent: 'center', 
          marginTop:30,
      }
});