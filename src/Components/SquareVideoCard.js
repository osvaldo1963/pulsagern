import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight} from 'react-native'
import FastImage from 'react-native-fast-image'

const {Color} = require('../Components/Color')
export default class SquareVideoCard extends React.PureComponent {
    render() {
        const props = this.props
        return(
            <TouchableHighlight onPress={props.onPress} style={this.props.style}>
                <View style={this.props.style}>
                    <FastImage source={{uri: props.thumbnail}} style={styles.backgroundImage} resizeMode="cover"/>
                    <View style={styles.camereIcon}>
                        <FastImage source={require('../Images/videoCamera.png')} style={styles.iconImage}/>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    camereIcon: {
        position: 'absolute',
        margin: 15,
        bottom: 0,
        height: 50,
        width:  50,
        borderRadius: 25,
        backgroundColor: Color.appColorRGB,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    iconImage: {
        width: '50%',
        height: '50%'
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
});