import * as React from 'react';
import { Image, TextInput, StyleSheet, View, Dimensions, TouchableHighlight, Text, ScrollView } from 'react-native';
import HomeButton from '../components/HomeButton';


export default function SignupScreen({navigation}) {
  const [hobbies, setHobbies] = React.useState([]);
  const [formValue,setFormValue] = React.useState('');
  const textInput = React.createRef();

  const submitInfo = () => {
    setHobbies(hobbies => {
      if(formValue=='')
        return hobbies;

        let old = [...hobbies];
        old.push(formValue);
        return old;
    });
        //console.log("submitted");
        setFormValue('');
        textInput.current.clear();
  }

  const sendItems = () =>{
    //HTTP get request
    navigation.navigate('IconSetup');
  }

  const generateItem = () =>{
      let items = [ ];
      for(let i=0;i<hobbies.length;i++){
          items.push(
            <View style={styles.hobbyItem}>
            <Text style={styles.hobbyText}>{hobbies[i]}</Text>
            <TouchableHighlight onPress={() => handleRemove(i)}  style={styles.removeButton}><Text style={styles.closeText}>x</Text></TouchableHighlight>
            </View>
         )
      }
      console.log(hobbies);
      //sendItems();
      return items;
  }

  const handleRemove=(i)=>{
    console.log("removing");
    setHobbies(hobbies => {
        let old = [...hobbies];
        old.splice(i,1);
        return old;
    });
  }


    return (
        <View style={styles.container}>
            <View>
              <Image
                source={
                    require('../assets/images/turqheader.png')
                }
                style={styles.headerImage}
              />
           
            <HomeButton navigation={navigation}/>
            <Image
                source={
                    require('../assets/images/lightturqbub.png')
                }
                style={styles.headerBubbles}
              />

            </View>

         
            <Text style={styles.midText}>
            Hobbies.
            </Text>

            <View style={styles.midHold}>
            <ScrollView contentContainerStyle={styles.hobbiesHolder} >
            {generateItem()}
            </ScrollView>
            </View>
          

            <View style={styles.buttonContainer}>
            <TextInput
            secureTextEntry={false}
            placeholderTextColor = "#151616"
            placeholder="Type Another"
            onChangeText={(text) => setFormValue(text)}
            onSubmitEditing={submitInfo}
            autoCapitalize="words"
            ref={textInput}
            style={styles.textInput}/>

            <TouchableHighlight style={styles.touchStyle} onPress={()=>sendItems()} >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableHighlight>
            </View>
    
           
        </View>
      );
}

var widthVal = Dimensions.get('window').width + 10; 

const styles = StyleSheet.create({
    closeText:{
      color:`#FFF`,
      fontSize:30,
      top:0,
 
    },
    midHold:{
      height:230, 
      marginTop:15,
      backgroundColor: 'rgba(52, 52, 52, 0.1)',
      
    },
    removeButton:{
      alignSelf:`flex-end`,
      paddingRight:10,
      marginTop:-40,
    },
    hobbyText:{
      color:`#FFF`,
      fontSize:25,
      textAlign:`center`,
    },
    hobbiesHolder:{
      justifyContent:`center`,
      alignContent:`center`,
      padding:20,
      paddingLeft:83,
    },
    hobbyItem:{
      alignItems:`center`,
      justifyContent:`center`,
      backgroundColor:`#1A1A1A`,
      height: 70,
      width: 230,
      margin:8,
      borderRadius: 8,
      borderWidth:6,
      borderColor:'#FAE99E',
    },
    container: {
      flex:1,
        backgroundColor: '#FFFF',
    },
    headerImage:{
      elevation: -1,
      width:widthVal,
      height:250,
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
        fontSize:90,
        marginTop:-95,
      
        fontWeight:`bold`,
        textAlign:`center`,
        color:`#FFF`,
    },
    touchStyle:{
        marginTop:20,
        marginBottom:30,
        backgroundColor:`#FAE99E`,
        borderRadius:8,
        alignItems:`center`,
        justifyContent:`center`,
        padding:5,
        width:300,
        fontSize:100,
        height:65,
      },
      buttonText:{
        fontSize:25,
        color:`#202020`,
      },
      bottomBubble:{
        elevation:-1,
        alignSelf:`flex-end`,
        marginTop:-120,
      },
      textInput:{
          margin:8,
          marginTop:0,
          padding:10,
          backgroundColor:`#47CEB2`,
          color:`#151616`,
          fontSize:25,
          width:300,
          height:65,
          borderRadius:8,
          textAlign:`center`,
      },
      buttonContainer:{
            alignItems: 'center',
            justifyContent: 'center', 
          marginTop:30,
      }
});