import * as React from 'react';
import {View,ScrollView,Text,StyleSheet, TouchableHighlight} from 'react-native';
import axios from 'axios';

export default function ChatScreen(props){
    const [channels, setChannels] = React.useState([]);

    const getChannels=async()=>{
        await axios.get('http://lahacks-hobbyist.tech:3000/chat/channels/')
        .then(()=>{
            console.log(response);
            setChannels(response.channels);
        })
        .catch(()=>{
            console.log("error occurred");
        })
    }

    const getChats=()=>{
        let chats = [ ];
        for(let i=0;i<channels.length;i++){
            items.push(
              <View style={styles.channel}>

              <Text style={styles.channelLabel}>{channels[i]}</Text>
              <TouchableHighlight onPress={() => handleRemove(i)}  style={styles.removeButton}><Text style={styles.closeText}>x</Text></TouchableHighlight>
              <TouchableHighlight onPress={()=>{handleOpen(i)}} style={styles.reply}></TouchableHighlight>
              </View>
           )}
        
        console.log(chats);
        //sendItems();
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


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#202020',
     
    },

});