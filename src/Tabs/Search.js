import React, { Component } from 'react';
import { StyleSheet, View, Alert, Dimensions, Text, SectionList, TouchableHighlight} from 'react-native';
import SquareVideoCard from '../Components/SquareVideoCard';
import SearchBar from '../Components/Search/SearchBar';
import {SuperGridSectionList} from 'react-native-super-grid';
import Parse from 'parse/react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import FastImage from 'react-native-fast-image'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome' 
//Custom Functions
const {Color} = require('../Components/Color')

export default class Search extends Component {

    static navigationOptions = {
        title: 'Search',
    };
    constructor(props) {
        super(props)
        this.state = {
            search: 'f',
            videos: [],
            users: [],
            mainView: 1, 
            searchView: null
        }
    }
    componentDidMount = () => {
        this.searchVideo()
    }
    componentWillMount = ()=> {
        this.setState(() => ({
            search: '',
            videos: []
        }))
    }
    inputText = (value) => {
        this.setState(() => ({
            search: value,
            mainView: null, 
            searchView: 1
        }))
        this.searchVideo()
        
    }
    videoPlayerPage = (item) => {
        this.props.navigation.navigate('VideoPlayer', {item: item})
    }
    searchVideo = () => {
        const searchText = this.state.search +  " "
        if(searchText.toString() != ' ') {
            const byHandle = new Parse.Query(Parse.User)
            byHandle.fullText('handle', searchText)
            byHandle.find().then((usersSearch) => {
                console.log(usersSearch)
                this.setState(() => ({
                    users: usersSearch
                }))
            })
            
            const byDecription = new Parse.Query('Videos')
            byDecription.fullText('description', searchText)
            byDecription.find().then((result) => {
                this.setState(() => ({
                    videos: result
                }))
            })
        } else  {
            const query = new Parse.Query('Videos')
            query.find().then((result) => {
                this.setState(() => ({
                    videos: result
                }))
            }).catch((err) => {
                Alert.alert(err)
            })
        }
        
    }
    fetchHeader = () => (
        <SearchBar onChangeText={this.inputText} onPressSearch={this.searchVideo}/>
    )
    fetchItem = ({item}) => (
        <View style={styles.itemContainer}>
            <SquareVideoCard style={{flex: 1}} thumbnail={item.get('thumbnail').url()} onPress={() => this.videoPlayerPage(item)}/>
        </View>
    )

    FirstRoute = () => (
        <View style={[{flex: 1}]} >
            <SuperGridSectionList
                itemDimension={130}
                renderItem={this.fetchItem}
                sections={[{title: 'videos', data: this.state.videos}]}
                keyExtractor={(item, index) => item + index}
                stickySectionHeadersEnabled={false}
                style={[styles.gridView, {flex: this.state.mainView}]} />
        </View >
    )
    profilePage = (item) => {
        this.props.navigation.navigate('userProfile', {user: item})
    }
    userRow = ({item}) => (
        <TouchableHighlight onPress={() => this.profilePage(item)}>
            <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                <FastImage source={{uri: item.get('profilePicture').url()}} style={{width: 50, height: 50, borderRadius: 25}}/>
                <Text>{item.get('handle')}</Text>
            </View>
        </TouchableHighlight>
    )

    SecondRoute = () => (
        <View style={[{flex: 1}]} >
            <SectionList
                itemDimension={130}
                renderItem={this.userRow}
                sections={[{title: 'videos', data: this.state.users}]}
                keyExtractor={(item, index) => item + index}
                stickySectionHeadersEnabled={false}
                style={[styles.gridView, {flex: this.state.mainView}]} />
        </View >
    )
    
    
    render() {
        // Taken from https://flatuicolors.com/
        //item.video.videoThumnail
        return (
            <View style={{flex: 1}}>
            <SearchBar onChangeText={this.inputText} onPressSearch={this.searchVideo}/>
                <TabView
                    renderTabBar={(props) => 
                        <TabBar {...props} 
                            indicatorStyle={{backgroundColor: Color.appColor,}} 
                            style={{backgroundColor: 'white', height: 45, color: 'black'}} 
                            labelStyle={{color: 'black'}}/>
                    }
                    navigationState= {{
                            index: 0,
                            routes: [
                            { key: 'first', title: 'Videos' },
                            { key: 'second', title: 'Users' },
                            ],
                        }}
                    renderScene={SceneMap({
                        first: this.FirstRoute,
                        second: this.SecondRoute,
                    })}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
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
    gridView: {
        paddingTop: 5,
        backgroundColor: 'white',
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        height: 180,
    },
});