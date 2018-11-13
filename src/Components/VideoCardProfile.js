import React from 'react'
import {View, Text, StyleSheet,TouchableHighlight} from 'react-native'
import FastImage from 'react-native-fast-image'
import ReactionSection from './ReactionSection'
export default class VideoCardProfile extends React.Component {
    render() {
        return(
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={styles.containerStyle}>
                        <FastImage 
                            source={{ uri: this.props.thumbnail }} 
                            style={styles.cardBackground} 
                            resizeMode="cover"/>
                    <View style={styles.gradiendBackground}>
                            <Text style={styles.text2D}>2D</Text> 
                        <View style={styles.bodySection}>
                            <ReactionSection style={styles.reacttionIcons} />
                        </View>
                        <View style={styles.videoDesctSection}>
                            <Text style={styles.descriptionText}>
                                The idea with React Native Elements is more about component structure than actual design.
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 5,
        left: '2.5%',
        width: '95%',
        height: 250,
        shadowOffset: {  width: 0,  height: 9,},
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOpacity: 0.5,
        borderRadius: 5,
        elevation: 2,
    },
    text2D: {
        position: 'absolute', 
        right: 0, 
        margin: 10, 
        color: 'white'
    },
    cardBackground: {
        width: '100%', 
        position: 'absolute', 
        height: '100%'
    },
    gradiendBackground: {
        width: '100%', 
        position: 'absolute', 
        height: '100%', 
        backgroundColor: 'rgba(0,0,0,0.2)'
    }, 
    bodySection: {
        position: 'absolute',
        width: '100%',
        bottom: 100,
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
    }, 
    profilePicture: {
        width:54, 
        height: 54, 
        margin: 10, 
        borderRadius: 27, 
        borderWidth:2, 
        borderColor: 'white'
    }, 
    usernameText: {
        color: 'white', 
        fontWeight: 'bold'
    }, 
    reacttionIcons: {
        position: 'absolute', 
        right: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginRight: 10
    }, 
    icons: {
        width: 24, 
        height: 24, 
        margin: 5
    },
    videoDesctSection: {
        backgroundColor: 'white',
        position: 'absolute', 
        width: '100%', 
        height: 80, 
        bottom: 0, 
        flex: 1
        
    },
    descriptionText: {
        margin: 15, 
        fontFamily: 'Avenir-light', 
        fontSize: 12, 
        height: 40
    }
  })