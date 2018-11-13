import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image,
    TouchableHighlight,
    Alert
} from 'react-native';
import Parse from 'parse/react-native';
import  FBSDK, {LoginManager,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import { GoogleSignin} from 'react-native-google-signin';
GoogleSignin.configure();
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addCurrentUser} from '../Reducer/UserAction'
const {socialMediaLogIn} = require('../Functions/Auth')
const {Color} = require('../Components/Color');

class Start extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props)
    }
    componentDidMount = () =>{
    }
    goToHomePage = () => {
        this.props.navigation.navigate('BottomTabs')   
    }
    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const user = userInfo.user
            socialMediaLogIn(user.email, user.email, user.givenName, false, true, false, (err, auth) => {
                if(err === null) {
                    this.goToHomePage()
                    this.props.addCurrentUser(auth)
                } else {
                    //alert('Error', err.toString())
                    console.log(err)
                }
            })
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
                alert('Error', error)
                console.log(error)
            } else {
             // some other error happened
                alert('Error', error)
                console.log(error)
            }
        }
    }
    responseInfoCallback = (error, result) => {
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            socialMediaLogIn(result.email, result.email, result.first_name, true, false, false, (err, auth) => {
                if(err === null) {
                    this.props.addCurrentUser(auth)
                    this.goToHomePage()
                } else {
                    alert('Error', err)
                    console.log(err)
                }
            })
        }
    }
    facebookLogIn = () => {
        LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
            if (result.isCancelled) {
               
            } else {
                const infoRequest = new GraphRequest(
                    '/me',
                    {
                        parameters: {
                          fields: {
                            string: 'email,name,first_name,middle_name,last_name, picture'
                          }
                        }
                      },
                    this.responseInfoCallback,
                  );
                  new GraphRequestManager().addRequest(infoRequest).start();
            }
        },
            (error) =>  {
                Alert.alert('Login failed with error: ' + error);
        });
    }
    componentWillMount = () =>   {
        Parse.User.currentAsync().then((user) => {
            if(user) {
                this.props.addCurrentUser(user)
                this.goToHomePage()
            }
        })
        
    }
    render() {
        return(
            <View style={styles.mainView}>
                    <Image source={require('../Images/background.jpg')} style={styles.backgroundImage}/>
                    <View style={styles.container}>
                        <Text style={styles.pulsageText}>Pulsage</Text>
                        <TouchableHighlight 
                            style={styles.emailButton}
                            onPress={() => this.props.navigation.navigate('Login')}
                            underlayColor={Color.appColor}>
                            <Text style={styles.buttonText}>Log In </Text>
                        </TouchableHighlight>
                        <TouchableHighlight 
                            style={styles.signUpButton}
                            onPress={()=> this.props.navigation.navigate('Signup')}
                            underlayColor="transparent">
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableHighlight>
                        <Text style={styles.buttonText}>Or use your Social Media</Text>
                        <View style={styles.smbCotainer}>
                            <TouchableHighlight 
                                style={styles.facebookButton}
                                onPress={this.facebookLogIn} 
                                underlayColor="transparent">
                                <Image source={require('../Images/facebookLogo.png')} style={{width: 55, height: 55}}/>
                            </TouchableHighlight>
                            <TouchableHighlight 
                                style={styles.gmailButton}
                                onPress={this.signIn} 
                                underlayColor="transparent">
                                <Image source={require('../Images/google-logo.png')} style={{width: 55, height: 55}}/>
                            </TouchableHighlight>
                        </View>
                        <TouchableHighlight style={styles.termsConditions}>
                            <Text style={styles.termsConditionsText}>By Signing up you are agreeing to our terms and conditions</Text>
                        </TouchableHighlight>
                    </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',    
        width: '100%', 
        height: '100%',
    },
    pulsageText: {
        textAlign: 'center',
        fontSize: 40,
        color: 'white',
        fontFamily: 'Avenir-Light',
        paddingBottom: 30,
    }, 
    emailButton: {
        justifyContent: 'center',
        backgroundColor: Color.appColor,
        height: 55,
        width: '90%',
        borderRadius: 55,
        margin: 9,
    },
    signUpButton: {
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        borderColor: 'white',
        height:55,
        width: '90%',
        borderRadius: 55,
        margin: 9,
    },
    smbCotainer: {
        flexDirection: 'row',
        padding: 20,
    },
    facebookButton: {
        justifyContent: 'center',
        backgroundColor: '#3B5998',
        height:55,
        width: 55,
        borderRadius: 50,
        margin:11,
    }, 
    gmailButton: {
        justifyContent: 'center',
        backgroundColor: 'white',
        height:55,
        width: 55,
        borderRadius: 50,
        margin:11,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Avenir',
        fontSize: 16,
        textAlign: 'center', 
    },
    termsConditions: {
        position: 'absolute',
        bottom:22,
    },
    termsConditionsText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12
    }
});
const mapStateToProps = (state) => {
    const {users} = state
    return {users}
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addCurrentUser,
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(Start)