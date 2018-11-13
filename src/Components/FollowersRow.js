import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image'
//
export default class FollowersRow extends React.Component {
    componentDidMount = () => {
    }
    render() {
        const user = this.props.user
        return(
            <View style={styles.main}>
                <FastImage source={{uri: user.get('profilePicture').url()}} style={styles.profilePicture}/>
                <View style={styles.commentSection}>
                    <Text style={styles.userName}>{user.get('handle')}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 1,
        backgroundColor: 'white',
        flexGrow: 1,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    profilePicture: {
        width: 50, height: 50,
        borderRadius: 25,
        marginBottom: 15,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    }, 
    commentSection: {
        flex: 1,
        flexDirection: 'column',
    },
    commentText: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Avenir',
        marginRight: 20,
        marginTop: 20,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    userName: {
        marginRight: 20,
        marginTop: 0,
        marginBottom: 10,
        fontSize: 12,
        color: 'gray'
    }
});