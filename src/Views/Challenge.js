import React from 'react'
import {View, Text, StyleSheet, Alert, TouchableHighlight} from 'react-native'
import ChallengeHeader from '../Components/Challenge/ChallengeHeader'
import ChallengeRow from '../Components/Challenge/ChallengeRow'
import { withNavigation } from 'react-navigation'
import {SuperGridSectionList} from 'react-native-super-grid'
import Parse from 'parse/react-native'

class Challenge extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount = () =>{
        this.fetchChallenge()
    }
    fetchChallenge = () => {
        Parse.Cloud.run('fetchChallenges').then((result) => {
            this.setState(() => ({ data: result }))
        }).catch((err) => {
            Alert.alert(err)
        })
    }
    goToPage = () => {
        this.props.navigation.navigate('ChallengePage')
    }
    headerSection = ({section}) => (
        <TouchableHighlight onPress={this.goToPage}>
            <ChallengeHeader title={section.title.get('description')} />
        </TouchableHighlight>
        
    )
    itemRow = ({item}) => (
        <ChallengeRow thumbnail={item.get('thumbnail').url()}/>
    )
    render() {
        return(
            <View style={styles.mainView}>
                <SuperGridSectionList
                    itemDimension={130}
                    style={styles.sectionList}
                    stickySectionHeadersEnabled = {false}
                    sections={this.state.data}
                    style={styles.gridView}
                    renderItem={this.itemRow}
                    renderSectionHeader={this.headerSection}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white'
    },
    sectionList: {
        backgroundColor: 'white'
    }
});

export default withNavigation(Challenge)