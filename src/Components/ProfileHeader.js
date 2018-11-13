import React from 'react';
import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Divider } from 'react-native-elements'
const {Color} = require('./Color');

export default class ProfileHeader extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ButtonActive: true,
            videoButtonColor: 'transparent',
            challengeButtonColor: 'transparent',
            btnWidth: 0,
            btnHeight: 0
        }
    }
    componentDidMount() {
        this.changeActiveButton("Video")
        this.followButtonActive()
    }
    itemPressed(index) {
        this.props.onPress(index)
    }
    changeActiveButton = (Button) => {
        if(Button === "Video") {
            this.setState(() => ({
                videoButtonColor: Color.appColor,
                challengeButtonColor: 'transparent',
            }))
        } else {
            this.setState(() => ({
                videoButtonColor: 'transparent',
                challengeButtonColor: Color.appColor,
            }))
        }
    }
    followButtonActive = () => {
        if(this.props.followButton) {
            this.setState(() => ({
                btnWidth: 120, 
                btnHeight: 40
            }))
        } else {
            this.setState(() => ({
                btnWidth: 0, 
                btnHeight: 0
            }))
        }
    }
    render() {
        const props = this.props
        return(
            <View style={this.props.style}>
                <View style={styles.userInfoSection}  >
                    <FastImage source={props.profilePicture} style={styles.ProfilePicture} resizeMode="contain"/>
                    <Text style={styles.handle} >{props.handle}</Text>
                    <TouchableHighlight style={[styles.FollowButton, {width: this.state.btnWidth, height: this.state.btnHeight}]} onPress={() => this.props.followBtn()} >
                        <Text  style={styles.FollowText}>Follow</Text>
                    </TouchableHighlight>
                </View >
                <Divider style={styles.divider}/>
                <View style={styles.ButtonSection}>
                    {/*Comment likes and followers sections*/}
                    <TouchableHighlight style={{flex: 1}}>
                        <View style={styles.Buttons}>
                            <Text style={styles.ButtonsNumberText}>{props.likes}</Text>
                            <Text style={styles.ButtonsText}>Likes</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex: 1}} onPress={() => props.followersOnPress()}>
                        <View style={styles.Buttons}>
                            <Text style={styles.ButtonsNumberText}>{props.followers}</Text>
                            <Text style={styles.ButtonsText}>Followers</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex: 1}} onPress={() => props.followingOnPress()}>
                        <View style={styles.Buttons}>
                            <Text style={styles.ButtonsNumberText}>{props.following}</Text>
                            <Text style={styles.ButtonsText}>Following</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <Divider style={styles.divider}/>
                <View style={styles.ButtonChaVidSection}>
                    <TouchableHighlight 
                        style={[styles.ButtonChaVid, {backgroundColor: this.state.videoButtonColor}]}
                        onPress={() => {
                            this.changeActiveButton("Video")
                            this.itemPressed(0)
                        }}
                        underlayColor='transparent' >
                        <Image source={require('../Images/play.png')} style={styles.ButtonChaVidImage} resizeMode="contain"/>
                    </TouchableHighlight>

                    <TouchableHighlight 
                        style={[styles.ButtonChaVid, {backgroundColor: this.state.challengeButtonColor}]}
                        onPress={() => {
                            this.changeActiveButton("Challenge")
                            this.itemPressed(1)
                        }}
                        underlayColor='transparent'>
                        <Image source={require('../Images/rocket.png')} style={styles.ButtonChaVidImage} resizeMode="contain"/>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    userInfoSection: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',  
    },
    ProfilePicture: {
        height: 90, width: 90, 
        margin: 20,
        borderRadius: 45,
        borderColor: Color.appColor,
        borderWidth: 2,
    },
    FollowButton: {
        backgroundColor: Color.appColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 15
    }, 
    FollowText: {
        color:'white'
    },
    handle: {
        padding: 10,
        fontSize: 16, 
        fontWeight: 'bold'
    },
    ButtonSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    Buttons: {
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingTop: 15,
        paddingBottom: 15
    }, 
    ButtonsNumberText: {
        fontWeight: 'bold',
        fontSize: 16,
    }, 
    ButtonsText: {
        fontWeight: '100', 
        color: 'gray'
    }, 
    ButtonChaVidSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 45,
        marginBottom: 15,
        marginTop: 15,
        marginLeft: 45,
        marginRight: 45,
    },
    ButtonChaVid: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 22,
        width: 100
    },
    ButtonChaVidImage: {
        width: 25,
        height: 30
    },
    divider: {
        marginRight: 10, 
        marginLeft: 10
    }
});