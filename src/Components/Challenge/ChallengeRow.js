import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
export default class ChallengeRow extends React.Component {
    render() {
        const props = this.props
        return(
            <View>
                <FastImage source={{uri: props.thumbnail}} style={styles.image} resizeMode="cover" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        height: 130
    }
})