import React from 'react'
import {View, StyleSheet} from 'react-native'
import VideoPlayerHeader from '../Components/VideoPlayerHeader';
import SquareVideoCard from '../Components/SquareVideoCard'
import Parse from 'parse/react-native'
import {SuperGridSectionList} from 'react-native-super-grid'

export default class VideoPlayer extends React.Component {
    static navigationOptions = {
        title: 'Player',
    };
    constructor(props) {
        super(props)
        this.state = {
            videos: [],
            infoData:  this.props.navigation.state.params.item,
            handle: this.props.navigation.state.params.item.get('User'),
            videourl: this.props.navigation.state.params.item.get('videourl'),
            like: '',
            videoDescription: this.props.navigation.state.params.item.get('description'),
            pause: false
        }
 
    }
    componentDidMount = () => {
       this.fetchRelatedVideos()
    }

    componentWillMount = () => {
        
    }

    componentWillUnmount = () => {
        console.log('do something')
        this.setState(() => ({
            infoData: null,
            videos: [],
        }))
    }
    likeAction = () => {
        const videoid = this.state.infoData.id
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

    setData = (info) => {
        this.setState(() => ({
            infoData:  info,
            handle: info.get('User'),
            videourl: info.get('videourl'),
            like: 'red',
            videoDescription: info.get('description')
        }))
        this.fetchRelatedVideos()
    }
    profilePage = (item) => {
        this.props.navigation.navigate('userProfile', {user: this.state.handle})
        this.setState(() => ({
            pause: true
        }))
    }

    commentsPage = () => {
        this.props.navigation.navigate('Comments', {videoData: this.state.infoData})
        this.setState(() => ({
            pause: true
        }))
    }
    fetchRelatedVideos = () => {
        if(this.state.infoData.get('Challenges')){
            const challenge = this.state.infoData.get('Challenges')
            this.fetchChallengeRel(challenge.id)
        } else {
            this.fetchallVideos()
        }
    }

    fetchChallengeRel = (id) => {
        Parse.Cloud.run('realeated', {'challengeId': id}).then((back) => {
            console.log("did not get bideos")
            this.setState(() => ({
                videos: back
            }))
        })
    }

    fetchallVideos = () => {
        Parse.Cloud.run('notReleated').then((back) => {  
            console.log(back)
            this.setState(() => ({
                videos: back
            }))
           
        })
    }
//thumbnail={item.item.get('thumbnail').url()
    item = (item) => (
        <View style={[styles.itemContainer, { backgroundColor: '#3498db' }]}>
            <SquareVideoCard style={{flex: 1}} 
            thumbnail={item.item.get('thumbnail').url()}
            onPress={() => this.setData(item.item)}/>
        </View>
    )
    header = (item) => (
        <VideoPlayerHeader 
            pauseVideo={this.state.pause}
            source={this.state.videourl} 
            profileData={this.state.handle} 
            videoDescription={this.state.videoDescription}
            likeButtonColor={this.state.like}
            profileOnPress={this.profilePage}
            likeOnPress={this.likeAction}
            commentsPress={this.commentsPage}/>
    )

    render() {
        const content = this.props.navigation.state.params
        return(
            <View style={{flex: 1}}>
                <SuperGridSectionList
                    itemDimension={130}
                    sections={[{title: 'Title1', data: this.state.videos.slice(0, 6)}]}
                    style={styles.gridView}
                    renderSectionHeader={this.header}
                    renderItem={this.item}
                    stickySectionHeadersEnabled={false} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gridView: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: 'white'
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        height: 180,
    },
    
  });