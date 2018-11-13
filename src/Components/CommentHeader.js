import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image'

export default class CommentsHeader extends React.Component {
    render() {
        const profile = this.props.videoData.get('User')
        const video = this.props.videoData
        return(
            <View style={styles.main}>
                <FastImage source={{uri: profile.get('profilePicture').url()}} style={styles.profilePicture}/>
                <Text style={styles.commentText} >{video.get('description')}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'white',
        borderColor: 'rgba(0,0,0,0.1)',
        shadowOffset: {  width: 0,  height: 5},
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOpacity: 0.6,
        borderRadius: 2,
        borderWidth: 1,
        elevation: 2,
        flexGrow: 1,
        maxHeight: 120,
    },
    profilePicture: {
        width: 60, height: 60,
        borderRadius: 30,
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 10,
    }, 
    commentText: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Avenir',
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 'bold',
        
    }
});

