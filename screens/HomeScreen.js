import * as React from 'react';
import { Image, Platform, StyleSheet, View, Dimensions, TouchableHighlight, Text } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default function HomeScreen(props) {
  const search = () =>{
    props.navigation.navigate('SearchSetup', {setTOKEN:props.setTOKEN});
  }
  const signUp = () =>{
    props.navigation.navigate('Signup', {setTOKEN:props.setTOKEN});
  }

  const login=()=>{
    props.navigation.navigate('Login',{setTOKEN:props.setTOKEN});
  }

  const logout=()=>{
    props.setTOKEN(null);
  }

  const goToEdit=()=>{
    props.navigation.navigate('Hobbies',{TOKEN:props.TOKEN});
  }

  const toChat=()=>{
    props.navigation.navigate('Chat',{TOKEN:props.TOKEN});
  }


  if(!props.TOKEN){
  return (
    <View style={styles.container}>
        <View style={styles.welcomeContainer}>
         
          
        </View>
        <View style={styles.getStartedContainer}>
        <Image
            source={
                require('../assets/images/Group.png')
            }
            style={styles.midImageBub}
          />
        <Image source={
          require('../assets/images/leaf-doodle-png-2.png')
      
        }
        style={{
          height:170,
          width:170,
        }
    
          }/>
          
           <Text
          style={{
            fontFamily:`nunito-bold`,
            fontSize:60,
            color:'#FAE99E',
          }}>
            hobbyist
          </Text>
        </View>

        <View style={styles.buttonContainer}>
        <TouchableHighlight style={styles.touchStyle} onPress={()=>login()}>
        
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>signUp()}>
          <Text style={styles.freeText}>Or, click here to sign up.</Text>
        </TouchableHighlight>
        </View>

        <Image
            source={
                require('../assets/images/bubblesgrey.png')
            }
            style={styles.bottomBubble}
        />
    </View>
  )
  }
  return(
      <View style={styles.container}>
          <View style={styles.welcomeContainer}>
         
          
         </View>
         <View style={styles.getStartedContainer}>
         <Image
             source={
                 require('../assets/images/Group.png')
             }
             style={styles.midImageBub}
           />
         <Image source={
           require('../assets/images/leaf-doodle-png-2.png')
       
         }
         style={{
           height:170,
           width:170,
         }
     
           }/>
           
            <Text
           style={{
             fontFamily:`nunito-bold`,
             fontSize:60,
             color:'#FAE99E',
           }}>
             hobbyist
           </Text>
         </View>

      <View style={styles.buttonContainer}>
      <TouchableHighlight style={styles.touchStyle} onPress={()=>search()}>

          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
      <TouchableHighlight style={styles.touchStyle} onPress={()=>goToEdit()} >
              <Text style={styles.buttonText}>Edit</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.touchStyle} onPress={()=>toChat()}>
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.lilLog} onPress={()=>logout()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableHighlight>
      
      </View>

      <Image
          source={
              require('../assets/images/bubblesgrey.png')
          }
          style={styles.bottomBubble}
      />
  </View>
  )

}


var widthVal = Dimensions.get('window').width + 10; 

const styles = StyleSheet.create({
  freeText:{
    margin:20,
    width:400,
    color:`white`,
    fontSize:20,
    textAlign:`center`,
  },
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  buttonContainer:{
    marginTop:-30,
    alignItems:`center`,
    justifyContent:`center`,
  },
  touchStyle:{
    marginTop:5,
    backgroundColor:`#47CEB2`,
    borderRadius:50,
    marginVertical:20,
    alignItems:`center`,
    justifyContent:`center`,
    padding:5,
    width:300,

    height:50,
  },
  lilLog:{
    marginTop:10,
    marginBottom:30,
    borderRadius:50,
    alignItems:`center`,
    backgroundColor:`#FAE99E`,
    justifyContent:`center`,
    padding:5,
    width:200,
    height:50,
  },
  buttonText:{
    fontSize:25,
    fontWeight:`bold`,
    fontFamily:`Nunito`,
    color:`#202020`,
  },
  bottomBubble:{
    alignSelf:`flex-end`,
    marginTop:90,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 160,
    resizeMode: 'contain',
    paddingTop: 3,
    marginLeft: -10,
  },
  midImageBub:{
    position:`absolute`,
    marginTop:15,
  },
  headerImage: {
    width:widthVal,
    height:200,
    marginTop:-110,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical:50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
      height: 20,
      width: 200,
      color: `#FAE99E`,
      fontFamily: "Avenir",
      fontSize: 40,
      lineHeight: 80,
      textAlign: `center`,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
