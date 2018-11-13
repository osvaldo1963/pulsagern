import React from 'react'
import {Image, StyleSheet, View,} from 'react-native'
import { createBottomTabNavigator, createStackNavigator, withNavigation} from 'react-navigation'
import Home from './Home'
import Search from './Search'
import Notifications from './Notofications'
import UserProfile from '../Views/UserProfile'
import Profile from './Profile'
import VideoPlayer from '../Views/VideoPlayer'
import Comments from '../Views/Comments'
import Settings from '../Views/Settings'
import ChallengePage from '../Views/ChallengePage'
import Followers from '../Views/Followers'

const HomeNavigationBarStack = createStackNavigator({
    Home: {
        screen: Home,
    },
    VideoPlayer: {
        screen: VideoPlayer
    },
    userProfile: {
        screen: UserProfile
    }, 
    adminProfile: {
        screen: Profile
    },
    Followers: {
        screen: Followers
    },
    Comments: {
        screen: Comments
    },
    ChallengePage:  {
        screen: ChallengePage
    }
}, {
    navigationOptions: {
        title: 'Trending', 
        headerStyle: {
            backgroundColor: 'white'
        },
        headerBackTitle: null,
    },
})

const SearchNavigationBarStack = createStackNavigator({
    Search: {
        screen: Search
    }, 
},{
    navigationOptions: {
        headerStyle: {
            backgroundColor: 'white'
        }
    }
})

const NotiNavigationBarStack = createStackNavigator({
    Notifications: {
        screen: Notifications,
    }, 
}, {
    navigationOptions: {
        title: 'Notification', 
        headerStyle: {
            backgroundColor: 'white'
        }
    }
})

const ProfileNavigationBarStack = createStackNavigator({
    Profile: {
        screen: Profile,
    },
    Followers: {
        screen: Followers
    },
    Settings: {
        screen: Settings
    }
}, {
    navigationOptions: {
        title: 'Profile', 
        headerStyle: {
            backgroundColor: 'white'
        }
    }
})

const style = StyleSheet.create({
    tabIcons: {
        width: '100%',
        height: '100%',
        borderColor: '#DE605B',
        //borderBottomWidth: 2,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    Icons: {
        width: '55%',
        height: '55%',
        resizeMode: 'contain',
        alignItems: 'center', 
        justifyContent: 'center',
    }
})

const Main = createBottomTabNavigator({
    HomeTab: {
        screen: HomeNavigationBarStack,
        navigationOptions: {
            tabBarIcon: (<View style={style.tabIcons}><Image source={require('../Images/home.png')} style={style.Icons} /></View>),
            //tabBarVisible: false
        }
    },
    SearchTab: {
        screen: SearchNavigationBarStack,
        navigationOptions: {
            tabBarIcon: (<Image source={require('../Images/search.png')} style={style.Icons} />),
        }
    },
    Notifications: {
        screen: NotiNavigationBarStack,
        navigationOptions: {
            tabBarIcon: (<Image source={require('../Images/bell.png')} style={style.Icons} />),
        }
    },
    Profile: {
        screen: ProfileNavigationBarStack,
        navigationOptions: {
            tabBarIcon: (<Image source={require('../Images/user.png')} style={style.Icons} />),
        }
    },
}, {
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        initialRouteName: 'HomeTab',
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: 'white'
        }
    }
})

/*
class BottomTabs extends React.Component {
    render() {
        return(
            <View style={{flex: 1}}>
                <Main />
                <ActionButton buttonColor={Color.appColor} position='right' bgColor="rgba(0,0,0,0.5)" offsetY={90}>
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
        )
    }
}
*/
const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})

export default Main //withNavigation(BottomTabs)




