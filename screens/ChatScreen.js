import * as React from 'react';
import {View,ScrollView,Text,} from 'react-native';
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
        for(let i=0;i<hobbies.length;i++){
            items.push(
              <View style={styles.channel}>
              <Text style={styles.channelLabel}>{props[i]}</Text>
              <TouchableHighlight onPress={() => handleRemove(i)}  style={styles.removeButton}><Text style={styles.closeText}>x</Text></TouchableHighlight>
              </View>
           )
        }
        console.log(hobbies);
        //sendItems();
        return chats;
    }

    React.useEffect(getChannels,[]);

    return(
        <View style={styles.container}>
            <View style={styles.topBar}>
                
            </View>

        </View>
    )
}