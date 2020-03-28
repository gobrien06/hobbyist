import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { Alert, Image, StyleSheet,Dimensions, View, TouchableHighlight, Text, ActivityIndicator } from 'react-native';
import HomeButton from '../components/HomeButton';
import Icon from '../components/Icon';
import axios from 'axios';

export default function SearchSetupScreen(props) {
  const [isLoading,setLoading] = React.useState(false);
  const [longitude, setLongitude] = React.useState();
  const [latitude,setLatitude] = React.useState();
  const [nearby, setNearby] = React.useState(null);
  const [msg, setMsg] = React.useState("");
  

  const searchStart = async() =>{
    setLoading(true);
    setMsg("");
   await submitInfo();
    searchMatch();
  }

  const searchMatch = async() =>{
    if(nearby.hobby){
      console.log(nearby[0].hobby);
      props.navigation.navigate('MatchScreen',{hobbies:nearby[0].hobby,username:nearby[0].username,icon:nearby[0].icon,TOKEN:props.TOKEN,pending:nearby[0].pending_channel});
    }
    else{
      setMsg("There's nobody near you. Try adding hobbies!");
      setLoading(false);
      return;
    }

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
        if(response.data.nearby){
          setNearby(response.data.nearby);
        }
        console.log(response.data.nearby);
      })
    .catch((error)=>{
      console.log(error);
    })

    if(nearby==[]){
      setNearby(null);
    }

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
   

    React.useEffect(getLocation, []);

    if(!latitude || !longitude){
      getLocation();
      return(
        <View>
          
        </View>
      )
    }

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
                style={
                    styles.mapCircle
                }
                >
                  {latitude?<Marker
                  coordinate={{latitude:latitude,longitude:longitude}}
                  title="(You)"
                  />:<></>}

                  </MapView>
               
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
            
            />
            <Icon/>
            </View>
          

            <View style={styles.buttonContainer}>
         
            {isLoading && <ActivityIndicator color='47CEB2'size={50}/>}

            <TouchableHighlight style={styles.touchStyle} onPress={()=>searchStart()} >
              <Text style={styles.buttonText}>Start Searching</Text>
            </TouchableHighlight>
            </View>
            <Text style={styles.errorText}>
              {msg}
            </Text>
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
    errorText:{
      fontSize:22,
      fontFamily:`Nunito`,
      color:`grey`,
      marginTop:10,
 
      textAlign:`center`,
    },
    midTouch:{
        elevation:1,
        height:50,
        width:60,
        borderRadius:4,
        marginLeft:220,
        padding:8,
        position:`absolute`,
        backgroundColor:`#FAE99E`,
    },
    mapCircle:{
  
        elevation:-1,
        alignSelf:`center`,
        height:350,
        borderRadius:4, 
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
        fontFamily:`Nunito`,
    },
    touchStyle:{
        marginTop:40,
        marginBottom:10,
        backgroundColor:`#47CEB2`,
        borderRadius:50,
        alignItems:`center`,
        justifyContent:`center`,
        padding:5,
        width:240,
        height:60,
      },
      buttonText:{
        fontWeight:`bold`,
        fontFamily:`Nunito`,
        fontWeight:`bold`,
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
          textAlign:`center`,
      }
});