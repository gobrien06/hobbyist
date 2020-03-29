import * as React from 'react';
import {View,ScrollView,Text,StyleSheet, TouchableHighlight, Dimensions} from 'react-native';
import axios from 'axios';

export default function ChatScreen(props){
    const [channels, setChannels] = React.useState([]);

    const getChannels=()=>{
        const config = {
            headers: {
              'Authorization': 'BEARER ' + props.route.params.TOKEN,
            }
          }
          console.log(props.route.params.TOKEN);
          axios.get('http://lahacks-hobbyist.tech:3000/chat/channels/',config)
        .then((response)=>{
            console.log(response);
            setChannels([...response.channels],console.log(channels));
        })
        .catch(()=>{
            console.log("error occurred");
        })
    }

    const handleRemove=(i)=>{
        console.log("removing");
        setChannels(channels => {
            let old = [...channels];
            old.splice(i,1);
            return old;
        });
    }

    const handleOpen=(i)=>{
        //props.navigation.navigate('Channel');

        channels[i]
    }
    const getChats=()=>{
        let chats = [ ];
        for(let i=0;i<channels.length;i++){
            items.push(
              <View style={styles.channel}>

              <Text style={styles.channelLabel}>{channels[i]}</Text>
              <TouchableHighlight onPress={() => handleRemove(i)}  style={styles.removeButton}><Text style={styles.closeText}>x</Text></TouchableHighlight>
              <TouchableHighlight onPress={()=>handleOpen(i)} style={styles.reply}></TouchableHighlight>
              </View>
           )}
        
        console.log(chats);
        return chats;
    }
    

    React.useEffect(getChannels,[]);

    return(
        <View style={styles.container}>
            <ScrollView style={styles.displayChats}>
                {getChats()}
            </ScrollView>
        </View>
    )
}

var widthVal = Dimensions.get('window').width + 10; 
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#202020',
    },
    channel:{
        height:50,
        width:widthVal,
        borderWidth:1,
        borderRadius:2,
        borderColor:`#000`,
    },
    channelLabel:{
        color:`#FFF`,
        fontFamily:`Nunito`,
        fontSize:30,
        fontWeight:`bold`,
    },
    removeButton:{
        alignSelf:`flex-end`,
    },
    closeText:{
        fontSize:50,
        fontWeight:`bold`,
        color:`red`,
        fontFamily:`Nunito`,
    },
    reply:{
        height:30,
        width:100,
        backgroundColor:`#47CEB2`,
    }


});