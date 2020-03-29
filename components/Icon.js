import * as React from 'react';
import { Image, } from 'react-native';
import axios from 'axios';

export default function Icon(props){
    //const [icon, setIcon] = React.useState('');
    /*
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

    React.useEffect(getIcon,[]);*/

    return(
        <Image
        source={
            require('../assets/images/leaf-doodle-png-2.png')
        }
        style={
            props.styles,
            {
            borderRadius:100,
            height:140,
            width:140,
            alignSelf:`center`,
            marginTop:-183,
            marginRight:4,
        }
        }/>
    )
}
