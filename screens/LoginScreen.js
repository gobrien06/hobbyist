import * as React from 'react';
import { Image, TextInput, StyleSheet, View, Dimensions, TouchableHighlight, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HomeButton from '../components/HomeButton';
import axios from 'axios';

export default function LogIn(props) {
    const [usernm,setUserNM] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [error, setError] = React.useState(null);

    const submitInfo = async() => {
      let success = false;
      const user={
        username:usernm,
        password:password,
      }
      //console.log(user);
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

        props.navigation.navigate('SearchSetup');
    }

    return (
        <View style={styles.container}>
            <ScrollView>
            <View>
              <View
                style={styles.headerImage}
              />

        
            <HomeButton navigation={props.navigation}  />

            </View>

         
            <Text style={styles.midText}>
              Welcome.
            </Text>

            <View style={styles.buttonContainer}>
            <TextInput
            secureTextEntry={false}
            placeholder="Username"
            style={styles.textInput}
            onChangeText={(text) => setUserNM(text)}
            />
            
            
            <TextInput
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}/>
            <TouchableHighlight style={styles.touchStyle} onPress={()=>submitInfo()} >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
            </View>
            <Text style={styles.errorText}>
            {error}
            </Text>
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
    errorText:{
      margin:10,
      padding:20,
      fontSize:20,
      color:`#fff`,
    },
    container: {
        flex: 1,
        backgroundColor: '#202020',
    },
    headerImage:{
  
        width:widthVal,
        height:380,
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
        marginTop:-82,
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
        marginTop:50,
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