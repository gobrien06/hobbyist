import * as React from 'react';
import {View,ScrollView,Text} from 'react-native';
import axios from 'axios';

export default function ChatScreen(){
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


    React.useEffect(getChannels,[]);

    return(
        <View style={styles.container}>

        </View>
    )
}