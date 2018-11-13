import React from 'react';
import {View, Text, StyleSheet, SectionList, Image} from 'react-native';
import FlootingButton  from '../Components/FlootingButton';
import NotiRow from '../Components/NotiRow';
import NotiHeader from '../Components/NotiHeader';
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome' 
//Custom Functions
const {Color} = require('../Components/Color')

export default class Notifications extends React.Component {
    render() {
        return(
            <View style={styles.mainView}>
                <SectionList
                    style={styles.sectionList}
                    renderItem={({item, index, section}) => 
                        <NotiRow />
                    }
                    renderSectionHeader={({section: {title}}) => (
                        <NotiHeader />
                    )}
                    sections={[{title: 'Title1', data: ['item1', 'item2', 'item3', 'item4']},]}
                    keyExtractor={(item, index) => item + index}
                    stickySectionHeadersEnabled={false}
                />
                <ActionButton buttonColor={Color.appColor} position='right' bgColor="rgba(0,0,0,0.5)" >
                        <ActionButton.Item 
                            buttonColor='#9b59b6' 
                            title="Video" 
                            onPress={() => this.props.navigation.navigate('Recordvideo')}>
                            <Icon name="video-camera" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item 
                            buttonColor='#1abc9c' 
                            title="Create Challenge" 
                            onPress={() => this.props.navigation.navigate('Createchallenge')}>
                            <Icon name="rocket" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1, 
    },
    sectionList: {
        backgroundColor: 'white'
    }
});