//third party imports
import React from 'react';
import {View, Text, SectionList, Image, TouchableHighlight, StyleSheet, Alert} from 'react-native';
import ProfileHeader from '../Components/ProfileHeader';
import VideoCardProfile from '../Components/VideoCardProfile';
import Parse from 'parse/react-native';
import ActionSheet from 'react-native-actionsheet'
import { Divider } from 'react-native-elements'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/FontAwesome' 
//Custom Functions
const {Color} = require('../Components/Color')
//Redux imports
import {connect} from 'react-redux'
const ImageUrl = (url) => {
    if(url === '') {
        return require('../Images/user.png')
    } else {
        return {uri: url}
    }
}

class UserProfile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userData: '',
            handle: '',
            profilePicture: '',
            profileData: [],
            currentData: [],
            videosLiked: [],
            followers: [],
            following: [],
            currentTab: '',
            followActive: null,
        }
    }
    
    static navigationOptions = ({navigation}) => {
        return{
            title: 'Profile',
        }
    }
   
    componentDidMount = () => { 
        if(this.props.navigation.state.params){
            var user = this.props.navigation.state.params.user
            this.getUserData(user)   
        } else {
            var currentUser = this.props.users.currentUser
            this.getUserData(currentUser)
            this.props.navigation.setParams({ 
                profileType: 'admin',
                Settings : this.showActionSheet,
            });
    
        }
    }
    followAction = () => {
        var user = this.props.navigation.state.params.user
        var currentUser = this.props.users.currentUser
    
        const followAc = Parse.Object.extend('Follow')
        const followQuery = new followAc()
        followQuery.set('Following', user)
        followQuery.set('Followers', currentUser)
        followQuery.save().then((result) => {
            //do somthing if follow action success
        }).catch(() => {
            //do something if follow action fail
        })
    }
    
    getUserData = (user) => {
       
        this.setState(() => ({
            userData: user,
            handle: user.get('handle'),
            profilePicture: user.get('profilePicture').url(),
        }))
        this.getUserVideosAndChallenges(user.id)
        console.log(this.state.followActive)
    }
    getUserVideosAndChallenges = (id) => {
        Parse.Cloud.run('videosAndChallenges', {user: id}).then((result) => {
            this.setState(() => ({
                profileData: result, 
                videosLiked: result.likes,
                followers: result.followers,
                following: result.following,
            }))
            this.setCurrentData(0)
        }).catch((err) => {
            Alert.alert(err.toString())
        })
    }
    setCurrentData = (index) => {
        switch (index) {
            case 0:
                this.setState(() => ({
                    currentData: this.state.profileData.videos,
                    currentTab: 'videos'
                }))
                break;
            case 1:
                this.setState(() => ({
                    currentData: this.state.profileData.challenge,
                    currentTab: 'challenges'
                }))
                break;
        
            default:
                break;
        }
    }
    videoPlayerPage = (item) => {
        this.props.navigation.navigate('VideoPlayer', {item: item, videoInfo: item})
      
    }
    followersPage = () => {
        this.props.navigation.navigate('Followers', {data: this.state.followers, type: 'Followers'})
    }
    followingPage = () => {
        this.props.navigation.navigate('Followers', {data: this.state.following, type: 'Following'})
    }
    sectionHeader = (section) => (
        <ProfileHeader 
            handle={this.state.handle} 
            profilePicture={ImageUrl(this.state.profilePicture)}
            onPress={this.setCurrentData}
            followBtn={this.followAction}
            likes={this.state.videosLiked.length}
            followers={this.state.followers.length}
            following={this.state.following.length}
            followersOnPress={this.followersPage}
            followingOnPress={this.followingPage}
            followButton={true}/>
    )
    rowItem = ({item, index, section}) => {
        if(section.title === 'videos') {
            return(<VideoCardProfile thumbnail={item.get('thumbnail').url()} onPress={() => this.videoPlayerPage(item)}/>)
        } else {
            return(
            <View tyle={{paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 15,}}>
                <Text style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 15,}}>{item.get('description')}</Text>
                <Divider style={{ backgroundColor: 'lightgray'}} />
            </View>
            )
        }
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    logOutAction = () => {
        Parse.User.logOut().then(() => {
            console.log('send me back to start')
            console.log(this.props.navigation)
            this.props.navigation.navigate('Presenataion')
        });
    }

    actionResult = (index) => {
        switch (index) {
            case 0:
                this.goToPage()
                break;
            case 1:
                this.logOutAction()
                break
            default:
                break;
        }
    }
    render() {
        return(
            <View style={{flex: 1}}>
                <SectionList
                    renderSectionHeader={this.sectionHeader}
                    renderItem={this.rowItem}
                    sections={[
                        {title: this.state.currentTab, data: this.state.currentData},
                    ]}
                    keyExtractor={(item, index) => item + index}
                    stickySectionHeadersEnabled={false}
                    style={styles.sectionList}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sectionList: {
        backgroundColor: 'white'
    }
});

const mapStateToProps = (state) => {
    const{users}  = state
    return {users}
}

export default connect(mapStateToProps)(UserProfile)