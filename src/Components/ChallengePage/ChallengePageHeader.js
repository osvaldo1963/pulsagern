import React,  {Component} from 'react'
import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native'
const {Color} = require('../Color')

class ChallengePageHeader extends Component {
    render(){
        return(
        <View style={styles.mainView}>
            <View style={styles.headerView}>
                <Image source={require('../../Images/user.png')} style={styles.headerLogo} />
                <Text style={styles.headerHandle}>@Pulsage</Text>
            </View>
            <Image source={require('../../Images/background.jpg')} style={styles.backgroundImage}/>
            <View style={styles.footerView}>
                <TouchableHighlight style={styles.footerButtons}>
                    <Text>Best</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.footerButtons}>
                    <Text>First</Text>
                </TouchableHighlight>
            </View>
        </View>                     
        )
    }
}

const styles = StyleSheet.create({
    mainView:  {
        height: 250, 
    },
    headerView: {
        flexDirection: 'row', 
        padding: 10,
        alignItems: 'center',
    },
    headerLogo: {
        width: 50, 
        height: 50, 
        borderRadius: 25
    },
    headerHandle: {
        fontSize: 16, 
        paddingLeft: 10, 
        paddingRight: 10,
        marginLeft: 10, 
        marginRight: 10
    },
    backgroundImage: {
        height: 120, 
        width: '94%', 
        left: '3%',
        borderRadius: 5
    },
    footerView: {
        flexDirection: 'row'
    },
    footerButtons: {
        flex: 1, 
        padding: 10,
        margin: 20,
        backgroundColor: Color.appColor, 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,

    }
})
export default ChallengePageHeader