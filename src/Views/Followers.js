import React, {Component} from 'react'
import {View,  Text,SectionList, StyleSheet, TouchableHighlight} from 'react-native'
import FollowersRow from '../Components/FollowersRow'

export default class Followers extends Component {
    static navigationOptions = {
        title: 'Followers'
    }
    constructor(props){
        super(props)
    }
    goToProfile = (user) => {
        this.props.navigation.navigate('userProfile', {user: user})
    }
    render(){
        const usersData = this.props.navigation.state.params.data
        const type = this.props.navigation.state.params.type
        return(
            <View style={styles.mainView}>
                <SectionList 
                    renderItem={({item, index, section}) => 
                        <TouchableHighlight onPress={() => this.goToProfile(item.get(type))}>
                            <FollowersRow user={item.get(type)}/>
                        </TouchableHighlight>
                    }
                    sections={[
                      {title: 'Title1', data: usersData},
                    ]}
                    keyExtractor={(item, index) => item + index}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    }
})