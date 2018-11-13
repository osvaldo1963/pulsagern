import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default class ChallengeHeader extends React.Component {
    render() {
        return(
            <View style={styles.mainView}>
                <Image source={require('../../Images/background.jpg')} style={styles.imageBackground}/>
                <View style={styles.blackCover}>
                    <Text style={styles.challengeTitle} fontWeight='bold'>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blackCover: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 130,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 6,
    },
    imageBackground: {
        width: '95%',
        height: 130,
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 10,
    },
    challengeTitle: {
      position: 'absolute',
      color: 'white',
      fontSize: 18,
    }
})
