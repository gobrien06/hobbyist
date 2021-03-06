import * as React from 'react';
import { Image, StyleSheet,Dimensions, View, TouchableHighlight, Text, ScrollView, Linking, Platform} from 'react-native';
import HomeButton from '../components/HomeButton';
import Icon from '../components/Icon';
import axios from 'axios';


export default function SearchSetupScreen(props) {
    const searchAgain = () =>{
        props.route.params.loading(false);
        props.navigation.navigate('SearchSetup');
    }

    /*const openMsg = () =>{
      const link = (Platform.OS === 'android') ? `sms: ${from}?body=Hey! I just matched with you on Hobbyist, you seem pretty neat!`
      : `sms:${from}`;

      Linking.openURL(link); OPENS ANDROID SMS
    }*/

   

    const message = async() =>{
      props.navigation.navigate('Chat',{username:props.route.params.username,icon:props.route.params.icon,TOKEN:props.route.params.TOKEN});
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
               <Image 
               source={
                 require('../assets/images/oc-1.png')
               }
               style={styles.headerImage}/>
               
            <HomeButton navigation={props.navigation}/>

           
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

            <View style={{alignContent:`center`,justifyContent:`center`,textAlign:`center`, }}>
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
      fontFamily:`Nunito`,
      color:`#FAE99E`,
      fontSize:25,

    },
    scrollSettings:{
      height:100,
      width:200,
      alignSelf:`flex-end`,
      marginRight:5,
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

    rangeText:{
      fontFamily:`Nunito`,
      textAlign:`center`,
      marginTop:50,
        color:`#47CEB2`,
        fontSize:34,
    },
    hobbiesText:{
      fontFamily:`Nunito`,

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
        fontFamily:`Nunito`,
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
        borderRadius:50,
        alignItems:`center`,
        justifyContent:`center`,
        padding:5,
        width:240,
        height:60,
      },
      buttonText:{
        fontFamily:`Nunito`,
        fontWeight:`bold`,
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