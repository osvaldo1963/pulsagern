import React from 'react'
import {AsyncStorage, StyleSheet} from 'react-native'
import { createStackNavigator, createSwitchNavigator, withNavigation } from 'react-navigation'
import Start from './src/Presentation/Start'
import Login from './src/Presentation/Login'
import Signup from './src/Presentation/Signup'
import BottomTabs from './src/Tabs/BottomTabs'
import ChallengeNoVideo from './src/Views/ChallengeNoVideo'
import RecordVideo from './src/Views/RecordVideo'
import CreateChallenge from './src/Views/CreateChallenge'
import UploadVideo from './src/Views/UploadVideo'
import Parse from 'parse/react-native'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import UserReducer from './src/Reducer/UserReducer'
const store  = createStore(UserReducer)
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('iGQKoGJQTo3AUXSG4v1LMEXS0r9RRn9ecnpuJuuG', 'AnIzQa4V3cZ4ZAZ5ptlkcjSnT4oVTuK9HDnJN4Rn');
Parse.serverURL = 'https://parseapi.back4app.com/';

const PresentationStack = createStackNavigator({
  Start: { screen: Start },
  Login: { screen: Login },
  Signup: { screen: Signup}
}, {
  initialRouteName: 'Start',
});

const AttemptStack = createStackNavigator({
    Attempt: {screen: ChallengeNoVideo}
}, {
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: true,
  },
})

const RecordVid = createStackNavigator({
  Recordvideo: {screen: RecordVideo},
  Uploadvideo: {screen: UploadVideo},
}, {
  initialRouteName: 'Recordvideo',
  navigationOptions: {
    gesturesEnabled: true,
  },
})

const CreateCha = createStackNavigator({
  Createchallenge: {screen: CreateChallenge}
}, {
  mode: 'modal',
})

const MainComponent  = createStackNavigator({
  Presenataion: { screen: PresentationStack },
  BottomTabs:{ screen: BottomTabs },
  Attempt: {screen: AttemptStack },
  Recordvideo: {screen: RecordVid },
  Createchallenge: {screen: CreateCha },
}, {
  initialRouteName: 'Presenataion',
  mode: 'modal',
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false,
  },
},);

class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <MainComponent/> 
      </Provider>
    )
  }
}

export default App


