import * as React from 'react';
import { Image, StyleSheet,Dimensions, View, TouchableHighlight, Text, ScrollView, Platform, Linking } from 'react-native';
import HomeButton from '../components/HomeButton';
import Icon from '../components/Icon';
import axios from 'axios';

export default function SearchSetupScreen(props) {
    const [twiKey,setTwiKey] = React.useState(null);

    const searchAgain = () =>{
        props.navigation.navigate('SearchSetup');
    }

    
    
    const openMsg = () =>{
      const link = (Platform.OS === 'android')?'sms:1-408-555-1212?body=yourMessage'
      : 'sms:1-408-555-1212';
      
      Linking.canOpenURL(link).then(supported => {
        if (!supported) {
          console.log('Unsupported url: ' + url)
        } else {
          return Linking.openURL(url)
        }
      }).catch(err => console.error('An error occurred', err))
    }

    const getKey = async() =>{
      const config = {
        headers: {
          'Authorization': 'BEARER ' + props.route.param.TOKEN,
        }
      }
      console.log(config);
      await axios.post('http://lahacks-hobbyist.tech:3000/chat',config)
      .then((response)=>{
          console.log(response);
          setTwiKey(response.token);
      })
      .catch(()=>{
        console.log('Connection error. Please try again later.');
      })
    }

    const message = async() =>{
      await getKey();
      openMsg();
    }


    function listItems(){
      let items = [ ];
      console.log(props.route.params.hobbies);
      for(let i=0;i<props.route.params.hobbies.length;i++){
          items.push(
            <View style={styles.hobbyItem}>
            <Text style={styles.scrollText}>{'- '}{props.route.params.hobbies[i]}</Text>
            </View>
         )
      }
      console.log(props.hobbies);
      //sendItems();
      return items;
  }


    return (
        <View style={styles.container}>
            <View>
               <View style={styles.headerImage}/>
               
            <HomeButton navigation={props.navigation}/>

            <Image
                source={
                    require('../assets/images/lightturqbub.png')
                }
                style={styles.headerBubbles}
              />
            </View>

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
            <Icon url={props.icon}/>
            </View>

            <View style={{alignContent:`center`,justifyContent:`center`,textAlign:`center`, marginVertical:20,marginLeft:95}}>
            <Text style={styles.rangeText}>You and {props.route.params.username} like:</Text>
            <View style={styles.scrollSettings}>
              <ScrollView>
              {listItems()}
              </ScrollView>
            </View>
            </View>

            <View style={styles.buttonContainer}>
            <TouchableHighlight style={styles.touchStyle} onPress={()=>searchAgain()}>
              <Text style={styles.buttonText}>Search Again</Text>
            </TouchableHighlight>
    

            <TouchableHighlight style={styles.touchStyle} onPress={()=>message()} >
              <Text style={styles.buttonText}>Message</Text>
            </TouchableHighlight>
            </View>
         
         
        </View>
      );
}

var widthVal = Dimensions.get('window').width + 10; 

const styles = StyleSheet.create({
    scrollText:{
      color:`#FAE99E`,
      fontSize:25,

    },
    scrollSettings:{
      height:100,
      textAlign:`center`,
      width:200,
      marginLeft:55,
    },
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

    rangeText:{
      marginTop:30,
        color:`#47CEB2`,
        fontSize:30,
    },
    hobbiesText:{
      color:`#FAE99E`,
      fontSize:20,
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
        marginTop:-90,
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
        height:220,
        marginTop:-80,
        backgroundColor:`#47CEB2`,
    },
    headerBubbles:{
        width:100,
        height:120,
        position:`absolute`,
        marginTop:25,
    },
    midText:{
        fontSize:60,
        marginTop:-170,
        fontWeight:`bold`,
        textAlign:`center`,
        color:`#1A1A1A`, 
        marginBottom:10,
    },
    touchStyle:{
        marginTop:20,
        marginBottom:15,
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
        marginTop:-30,
        alignSelf:`flex-end`,
      },
      buttonContainer:{
      
        alignItems: 'center',
        justifyContent: 'center', 

      }
});