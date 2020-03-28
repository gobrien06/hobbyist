import * as React from 'react';
import MapView from 'react-native-maps';
import { Alert, Image, StyleSheet,Dimensions, View, TouchableHighlight, Text, Slider } from 'react-native';
import HomeButton from '../components/HomeButton';

export default function SearchSetupScreen({navigation}) {
  const [range,setRange] = React.useState(20);
  const [longitude, setLongitude] = React.useState();
  const [latitude,setLatitude] = React.useState();

  const searchStart = async() =>{

  }

  const submitInfo = async() => {
    let success = false;
    const user={
      username:usernm,
      password:password,
    }
    console.log(user);
    if(!usernm || !password){
      setError('Missing a field. Please enter all fields before continuing.');
      return;
    }
   await axios.post('http://lahacks-hobbyist.tech:3000/auth',user)
    .then((response)=>{
        props.route.params.setTOKEN(response.data.token);
        if(response.status == 200){
          success=true;
        }
        console.log(result);
      })
    .catch(()=>{
      setError('Network error. Please try again.');
    })

    if(!success){
      setError("Credentials incorrect. Please try again.")
      return;
    }

      props.navigation.navigate('MatchFound');
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
   

    React.useEffect(()=>
    {      
         getLocation();

    } )

    return (
        <View style={styles.container}>
            <View>
                <MapView 
                region={{
                    latitude:latitude,
                    longitude:longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onRegionChange={() => getLocation()}
                zoom={range}
                style={
                    styles.mapCircle
                }/>
               
            <HomeButton navigation={navigation} color="turq"/>

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