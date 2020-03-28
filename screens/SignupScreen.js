import * as React from 'react';
import { Image, TextInput, StyleSheet, View, Dimensions, TouchableHighlight, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HomeButton from '../components/HomeButton';
import axios from 'axios';

export default function SignupScreen(props) {
    const [usernm,setUser] = React.useState(null);
    const [password,setPassword] = React.useState(null);
    const [phone,setPhone] = React.useState(null);
    const [error, setError] = React.useState('');
 

    const submitInfo = async () => {
      const user={
        username:usernm,
        password:password,
        phone:phone,
      }
      //console.log(user);
      if(!usernm || !password || !phone){
        setError('Missing a field. Please enter all fields before continuing.');
        return;
      }
     await axios.post('http://lahacks-hobbyist.tech:3000/users',user)
      .then((response)=>{
          props.route.params.setTOKEN(response.data.token);
          console.log(response.data.token);
        })
      .catch(()=>{
        setError("Network error. Try again.")
      })
      console.log("sent");
      props.navigation.navigate('Hobbies');
    }

    return (
        <View style={styles.container}>
          
            <View>
              <View
              
                style={styles.headerImage}
              />

               
            <HomeButton navigation={props.navigation}  />

            </View>

         
            <Text style={styles.midText}>
            Let's start.
            </Text>

            <View style={styles.buttonContainer}>
            <TextInput
            secureTextEntry={false}
            placeholder="Username"
            style={styles.textInput}
            onChangeText={(text) => setUser(text)}/>
            <TextInput
            secureTextEntry={true}
            placeholder="Password"
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
            />
            <TextInput
            secureTextEntry={false}
            placeholder="Phone"
            style={styles.textInput}
            onChangeText={(text) => setPhone(text)}
            />
            <TouchableHighlight style={styles.touchStyle} onPress={()=>submitInfo()} >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableHighlight>
            <Text style={styles.errorText}>
            {error}
            </Text>
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
        marginTop:25,
    },
    midText:{
        fontSize:80,
        marginTop:-84,
        fontWeight:`bold`,
        marginLeft:5,
        textAlign:`left`,
        color:`#1A1A1A`,
    },
    touchStyle:{
        marginTop:30,
        marginBottom:30,
        backgroundColor:`#FAE99E`,
        borderRadius:8,
        alignItems:`center`,
        justifyContent:`center`,
        padding:5,
        width:200,
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
          marginTop:5,
      }
});