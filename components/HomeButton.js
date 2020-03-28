import * as React from 'react';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';


export default function HomeButton(props){
    const goHome = () => {
        
        props.navigation.navigate("Home");
    }

    if(props.color === "turq"){
        return(
            <TouchableHighlight onPress={() => goHome()} style={styles.iconHome}>
                    <Image
                        source={
                            require('../assets/images/turqoiseh.png')
                        }
                        style={styles.iconButton}
                    />
            </TouchableHighlight>
        )
    }
    else{
        return(
            <TouchableHighlight onPress={() => goHome()} style={styles.iconHome}>
                    <Image
                        source={
                            require('../assets/images/yellowh.png')
                        }
                        style={styles.iconButton}
                    />
            </TouchableHighlight>
        )
    }

}

const styles = StyleSheet.create({
    iconButton:{
        elevation: 1,
        height:45,
        width:45,
        borderRadius:8,
        margin:10,
        marginTop:30,
    },
    iconHome:{
        elevation: 1,
        alignSelf: `flex-end`,
        position:`absolute`,
    },
})