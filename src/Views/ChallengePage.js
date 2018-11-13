import React from 'react'
import {View, StyleSheet, Text, Image, TouchableHighlight} from 'react-native' 
import {SuperGridSectionList} from 'react-native-super-grid'
import ChallengePageHeader from '../Components/ChallengePage/ChallengePageHeader'
import SquareVideoCard from '../Components/SquareVideoCard'

/* 
renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <SquareVideoCard style={{flex: 1}}/>
                        </View>
                    )}
*/
export default class ChallengePage extends React.Component {
    static navigationOptions = {
        title: 'Challenges',
    }
    render() {
        return(
            <View style={{flex: 1}}>
                <SuperGridSectionList
                    itemDimension={130}
                    stickySectionHeadersEnabled = {false}
                    sections={[
                        {
                        title: 'Title1',
                        data: [
                            { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
                            { name: 'ETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
                            { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
                            { name: 'NEPHRITIS', code: '#27ae60' },
                        ]
                        }
                    ]}
                    style={styles.sectionList}
                    renderItem={({item, index, section}) => (
                            <View style={styles.itemContainer}>
                                <SquareVideoCard style={{flex: 1}}/>
                            </View>    
                         
                    )}
                    renderSectionHeader={({ section }) => (
                        <ChallengePageHeader />
                    )}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white'
    },
    sectionList: {
        backgroundColor: 'white'
    }, 
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        height: 130,
    },
    
});