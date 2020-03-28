import * as React from 'react';
import { Image, } from 'react-native';
import axios from 'axios';

export default function Icon(props){
    const [icon, setIcon] = React.useState('https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Fmobile%2F000%2F028%2F232%2Fhamster.jpg');
    
    const getIcon=()=>{
        if(props.icon && props.icon!=''){
            setIcon(props.icon);
            return;
        }

        const config = {
          headers: {
            'Authorization': 'BEARER ' + props.TOKEN,
          }
        }
    
         axios.post('http://lahacks-hobbyist.tech:3000/user/icon',config)
        .then((response)=>{
            console.log(response);
            if(response.data.icon){
              setIcon(response.data.icon);
            }
          
          })
        .catch(()=>{
          console.log("error");
        }) 
      }

    React.useEffect(getIcon,[]);

    return(
        <Image
        source={
            {uri:icon}
        }
        style={
            props.styles,
            {
            borderRadius:100,
            height:160,
            width:160,
            alignSelf:`center`,
            marginTop:-183,
            marginRight:4,
        }
        }/>
    )
}
