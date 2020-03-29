import * as React from 'react';
import  { Bubble, GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios';


export default function ChannelScreen(props){
    const [messages,setMessages] = React.useState();
    
    const getMessages=()=>{
        const config = {
            headers: {
              'Authorization': 'BEARER ' + props.TOKEN,
            }
          }

          const channelId ={
            channelId: props.route.params.channelId,
          }
      
         
        axios.post('http://lahacks-hobbyist.tech:3000/chat/channels/messages',channelId,config)
        .then((response)=>{
            setMessages(response.data.messages);
        })
        .catch((errors)=>{
            console.log(errors);
        })
    
    }

    const sendMessage=(content)=>{
        const config = {
            headers: {
              'Authorization': 'BEARER ' + props.TOKEN,
            }
          }

        const message ={
            channedId:props.route.params.channedId,
            content:content
        }
        
        axios.post('http://lahacks-hobbyist.tech:3000/chat/channels/messages', message,config)
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })
        
    }

    const gatherMessages=()=>{
        let items = [];
        if(!messages)
            return;
       for(let i=0;i<messages.length;i++){
            items.push({
                _id:messages[i].messageid,
                text:messages[i].content,
                createdAt:messages[i].date,
            })
       }
    }



    
    React.useEffect(getMessages,[]);

    return(
        <GiftedChat
        messages={messages}
        onSend={(content)=>sendMessage(content)}
        user={{
            _id: props.TOKEN,
        }}
        style={{
            backgroundColor:`#202020`,
            color:`#202020`,
        }}
      
        />
       
    ) 
}
