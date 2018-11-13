//third party imports
import React from 'react'
import { View, StyleSheet,  Alert, } from 'react-native'
import VideoCard from '../Components/VideoCard'
import HomeHeader from '../Components/HomeHeader'
import Swiper from 'react-native-swiper'
import Challenge from '../Views/Challenge'
import Share from 'react-native-share'
import Parse from 'parse/react-native'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'

import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome' 
//Custom Functions
const {Color} = require('../Components/Color')

//Redux imports
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addCurrentUser} from '../Reducer/UserAction'
//custom methods imports
const {CreateParseObject} = require('../Functions/ParseFunctions')

class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return params;
    };
    constructor(props) {
        super(props)
        this.itemPressed = this.itemPressed.bind(this)
        this.changeThisTitle = this.changeThisTitle.bind(this)
        this.shareOptions = this.shareOptions.bind(this)
        this.fetchVideo = this.fetchVideo.bind(this)
        this.state = {
           videos: [],
           isRefreshing: true 
        }
    }
    componentWillMount = () => {
       
    }
    registerNotofications = () => {
        
    }
    componentDidMount() {
        this.fetchVideo()

        
        //var randomNumber = this.randomNumber(1,3)
    }
    componentWillUnmount = () => {
        this.setState(() => ({
            videos: [],
            isRefreshing: true
        }))
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.videos !== nextState.videos) {
            return true
        }
        return false
    }
    randomNumber(minimum, maximum){
        return Math.round( Math.random() * (maximum - minimum) + minimum);
    }
    fetchVideo = () => {
        this.setState(() => ({
            isRefreshing: true
        }))
        var userid = this.props.users.currentUser.id
        //call cloud function to get videos for home page
        Parse.Cloud.run('fetchVideos', {'userId': userid}).then((result) => {
            this.setState(() => ({
                videos: result.video,
                isRefreshing: false
            }))
        }).catch((err) => {
            Alert.alert(err)
        })
    }
    shareOptions = () => {
        const shareOptions = {
            title: 'Share via',
            url: 'some share url',
        }
        Share.open(shareOptions)
        .then((res) => {})
        .catch((err) => {})
    }
    changeThisTitle = (index) => {
        if(index === 0){
            this.props.navigation.setParams({title: "Trending"})
        } else if(index === 1) {
            this.props.navigation.setParams({title: "Challenge"})
        }
    }  
    likeAction = (video) => {
        const videoid = video.video.videoId
        const userid = this.props.users.currentUser.id
        const videoToParseObject = CreateParseObject('Videos', videoid)
        videoToParseObject.fetch().then((vid) => {
            var votes = vid.get('Votes')
            var checkUser = votes.includes(userid)
            if(!checkUser) {
                votes.push(userid)
                vid.set('Votes', votes)
                vid.save().then((vidBack) => {
                    
                })
            }
        })
    }
    commentPage = (item) => {
        this.props.navigation.navigate('Comments', {videoData: item.video.viddata})
    }
    videoPlayerPage = (item) => {
        this.props.navigation.navigate('VideoPlayer', {item: item.video.viddata, videoInfo: item.video.viddata})
      
    }
    profilePage = (item) => {
        this.props.navigation.navigate('userProfile', {user: item.video.viddata.get('User')})
    }
    itemPressed = (id) => {
        this.props.navigation.navigate('Attempt')
    }
    rowItem = ({item}) => (
            <VideoCard 
                onPress={() => this.videoPlayerPage(item)} 
                videoData={item.video.viddata}           
                profilePress={() => this.profilePage(item)}
                commentsPress = {() => this.commentPage(item)}
                sharePress= {this.shareOptions}
                likePress={() => this.likeAction(item)}
                likeButtonColor={item.video.videoLiked} />
    )
    headerItem = () => (
        <HomeHeader profilePress={this.itemPressed}/>
    )
    render() {
        return(
        <Swiper 
            loop={false} 
            showsPagination={false} 
            onIndexChanged={this.changeThisTitle}>
            <View style={{flex: 1}}>
                <OptimizedFlatList
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.fetchVideo}
                    //onEndReachedThreshold={1200}
                    data={this.state.videos}
                    renderItem={this.rowItem}
                    //ListHeaderComponent={this.headerItem}
                    keyExtractor= {(item, index) => index.toString()}
                    style={{backgroundColor: 'white'}}
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
            <Challenge />

            

        </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})

const mapStateToProps = (state) => {
    const {users} = state
    return {users}
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addCurrentUser,
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Home)

//$(SRCROOT)/../../../ios