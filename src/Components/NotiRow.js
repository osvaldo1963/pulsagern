import React from 'react';
import {View, Text, Image, TouchableHighlight, StyleSheet} from  'react-native';

export default class NotiRow extends React.Component {
    render() {
        return(
            <View style={styles.main}>
                <Image source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'}} style={styles.profilePiture} />
                <View style={styles.notification}>
                    <Text style={styles.notiMessage}> sing a masshup of two song challenge from tidal</Text>
                    <Text style={styles.notiDate}>Today</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginLeft: 20,
        marginRight: 20,
    },
    profilePiture: {
        width: 50, height: 50,
        borderRadius: 25,
        margin: 15,
    },
    notification:  {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center', 
        flexGrow: 1,
    },
    notiMessage: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 5,
    },
    notiDate: {
        flex: 1,
        fontSize: 12,
        color: 'gray',
    }
});

