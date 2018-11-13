import React from 'react';
import {View, Image, Text, TouchableHighlight, StyleSheet, Alert} from 'react-native';
import {Divider } from 'react-native-elements';
export default class ChallengeNoVideo extends React.Component {
    render() {
        return(
            <View style={styles.mainView}>
                
                <View style={styles.profileSection}>
                    <Image source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'}} style={styles.profilePicture}/>
                    <Text style={styles.userName}>Tara Young</Text>
                    <Divider style={styles.divider}/>
                </View>
                <TouchableHighlight 
                    style={styles.closeButton}
                    onPress={() => this.props.navigation.dismiss() }>
                    <Text style={{color: 'white'}}>X</Text>
                </TouchableHighlight>
                <View style={styles.AttemptSection}>
                    <Text style={styles.message}>Create a 10 minutes song</Text>
                    <Text style={styles.text}>Be the first!</Text>
                    <TouchableHighlight style={styles.attemptButton}>
                        <Text style={styles.buttonText}>Attempt</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#6E87F0',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 40,
        width: 20, height: 20
    },
    profileSection: {
       flexDirection: 'column',
       marginTop: 40,
       marginBottom: 40,
       marginLeft: 20,
       marginRight: 20,
    },
    profilePicture: {
        width: 60, height: 60,
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 2,
    },
    userName: {
        color: 'white',
        fontSize: 14,
        marginTop: 15,
        marginBottom: 20,
        fontWeight: "bold"
    },
    divider: {
        backgroundColor: 'rgba(255, 255, 255,0.6)' 
    },
    AttemptSection: {
        flexDirection: 'column',
        marginTop:20,
        marginBottom: 40,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
    },
    message: {
        color: 'white',
        fontSize: 24,
        marginBottom: 40,
        textAlign: 'center',
        fontWeight: "bold"
    },
    text: {
        color: 'white',
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'center'
    },
    attemptButton: {
        width: '50%',
        height: 40,
        borderRadius: 4,
        backgroundColor: 'white' ,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign:  'center',
        color: '#383AED'
    }
})