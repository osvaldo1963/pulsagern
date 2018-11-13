import React from 'react'
import {View, Image, Text, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native'
import FastImage from 'react-native-fast-image'
import ReactionSection from './ReactionSection'
const {TimeSince} = require('../Functions/Functions')
export default class VideoCard extends React.PureComponent {
    
    constructor(props) {
        super(props)
    }

    render() {
        const props = this.props
        const video = this.props.videoData
        const profile = this.props.videoData.get('User')
        return(
            <TouchableHighlight 
                onPress={this.props.onPress} 
                underlayColor="transparent">
                <View style={styles.containerStyle} >
                    <FastImage 
                        source={{
                            uri: video.get('thumbnail').url(), 
                            headers:{ Authorization: 'someAuthToken' }, 
                            priority: FastImage.priority.normal}
                        } 
                        style={styles.cardBackground} resizeMode="cover" />    
                    <View style={styles.gradiendBackground}>
                        <Text style={styles.text2D}>{TimeSince(video.get('createdAt'))}</Text> 
                        <View style={styles.bodySection}>
                            <TouchableOpacity onPress={props.profilePress}>
                                <FastImage 
                                    source={{uri: profile.get('profilePicture').url(), headers:{ Authorization: 'someAuthToken' }, priority: FastImage.priority.normal}} 
                                    style={styles.profilePicture} 
                                    resizeMode="cover" 
                                    resizeMode={FastImage.resizeMode.contain}/>
                                <Text style={styles.usernameText} >@{profile.get('handle')} </Text>
                            </TouchableOpacity>
                            <ReactionSection 
                                style={styles.reacttionIcons}
                                share={props.sharePress} 
                                comment={props.commentsPress}
                                like={props.likePress}
                                likeButtonColor={props.likeButtonColor}/>
                        </View>
                        <View style={styles.videoDesctSection}>
                            <Text style={styles.descriptionText}>
                                {video.get('description')} 
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
        bottom: 80,
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
        borderColor: 'white',
        backgroundColor: 'white'
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
    },
    actionButtonIcon: {
        fontSize: 18,
        height: 20,
        color: 'white',
        marginRight: 7,
        marginLeft: 7,
      },
  })