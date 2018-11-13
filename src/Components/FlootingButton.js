import React from 'react';
import {View, StyleSheet, TouchableHighlight, Image} from 'react-native';
const {Color} = require('../Components/Color');

export default class FlootingButtom extends React.Component {
    render() {
        return(
            <View>
                <TouchableHighlight style={styles.button} onPress={this.props.onPress}>
                    <Image source={require('../Images/plus.png')} style={styles.buttonIcon}/>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({ 
    
    button: {
        position: 'absolute', 
        width: 55, 
        height: 55, 
        bottom: 0, 
        right: 0, 
        margin: 15, 
        backgroundColor: Color.appColor, 
        borderRadius: 30, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    buttonIcon: {
        width: '50%', 
        height: '50%',
    }
});