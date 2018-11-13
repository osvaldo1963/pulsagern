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
const {CreateParseObject} = require('../Functions/ParseFunctions')

const Settings = (navigation) => (
    <TouchableHighlight style={{right: 18, margin: 10}} onPress={navigation.getParam('Settings')} >
        <Image source={require('../Images/setting.png')} style={{height: 25, width: 25}}/>
    </TouchableHighlight>
)

const ImageUrl = (url) => {
    if(url === '') {
        return require('../Images/user.png')
    } else {
        return {uri: url}
    }
}

class Profile extends React.Component {
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
        }
    }
    
    static navigationOptions = ({navigation}) => {
        return{
            title: 'Profile',
            headerRight:  (
                navigation.getParam('profileType') === 'admin'?  Settings(navigation) : <View></View>
            )
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
            
        })
    }
    goToPage = () => {
        this.props.navigation.navigate('Settings')
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
            followersOnPress={this.followersPage}
            following={this.state.following.length}
            followingOnPress={this.followingPage}
            followButton={false}
            />
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
                 <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Settings Options'}
                    options={['Edit Profile', 'Log Out', 'cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={this.actionResult}
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
    sectionList: {
        backgroundColor: 'white'
    }
});

const mapStateToProps = (state) => {
    const{users}  = state
    return {users}
}

export default connect(mapStateToProps)(Profile)