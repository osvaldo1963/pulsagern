import React from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import Video from 'react-native-video'
import ReacttionSection from './ReactionSection'
import FastImage from 'react-native-fast-image'

export default class VideoPlayerHeader extends React.PureComponent {
    constructor(props){
        super(props)
    }
    componentDidMount = () => {
        
    }
    render() {
        const props = this.props
        const profileData = this.props.profileData
        const videoDescription = this.props.videoDescription
        return(
            <View style={styles.mainView}>
                <TouchableHighlight onPress={props.profileOnPress}>
                    <View style={styles.profileSection}>
                        <FastImage 
                            source={{uri: profileData.get('profilePicture').url()}}
                            style = {styles.profilePicture}/>        
                        <Text>@{profileData.get('handle')}</Text>
                    </View>
                </TouchableHighlight>
                <View>
                    <Video 
                        source={{uri: this.props.source}}  
                        style={styles.videoPlayer} 
                        controls={true}
                        resizeMode="contain"
                        paused={props.pauseVideo}
                    />
                </View>
                <View style={styles.videoInfoSection}>
                    <ReacttionSection 
                        style={styles.reacttionIcons} 
                        likeButtonColor={props.likeButtonColor}
                        likePressed={props.likeOnPress} 
                        comment={props.commentsPress}/>
                    <Text style={styles.videoDescription}>{videoDescription}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginBottom: 10,
    },

    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    profilePicture: {
        width: 55, height: 55,
        borderRadius: 27.5,
    },
    videoPlayer: {
        width: '100%', height: 230, 
        backgroundColor: 'black',
    },
    videoInfoSection: {
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    videoDescription: {
        margin: 10,
        fontSize: 12,
        height: 30
    },
    reacttionIcons: {
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '40%',
        marginLeft: '60%',
    }, 
});