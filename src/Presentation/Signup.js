import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableHighlight, Alert} from 'react-native';
const { validateEmail} = require('../Functions/Functions')
const {SignUp} = require('../Functions/Auth')
const {Color} = require('../Components/Color');
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addCurrentUser} from '../Reducer/UserAction'

class Signup extends React.Component {
    static navigationOptions = {
        title: 'Sign Up'
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        }
    }

    emailText = (input) => {
        this.setState({
            email: input
        })
    }

    usernamelText = (input) => {
        this.setState({
            username: input
        })
    }

    passwordText = (input) => {
        this.setState({
            password: input
        })
    }

    confirmpassText = (input) => {
        this.setState({
            confirmPassword: input
        })
    }

    goToHomePage = () => {
        this.props.navigation.navigate('BottomTabs')
    }

    fileUploadAndSignUp = () => {
        SignUp(this.state.email, this.state.password, this.state.username, false, false, false, (err, auth) => {
            if(err === null) {
                this.props.addCurrentUser(auth)
                this.goToHomePage()
            } else {
                alert('Error', err)
            }
        })
    }
    
    signUpAction = () => {
        if(this.state.password === this.state.confirmPassword){
            var emailValidation = validateEmail(this.state.email)
            if(emailValidation) {
                this.fileUploadAndSignUp()
            } else {
                Alert.alert('invalid email')
            }
        } else {
            Alert.alert("Password & Conformation password does not match")
        }
    }

    render() {
        return(
            <View style={styles.mainView}>
                <TextInput 
                    keyboardType="email-address"
                    style={styles.input} 
                    placeholder="Email"
                    underlineColorAndroid="rgba(255,255,255,1.0)"
                    onChangeText={this.emailText} 
                    allowFontScaling={true}/>
                <TextInput 
                    keyboardType="email-address"
                    style={styles.input} 
                    placeholder="Username"
                    underlineColorAndroid="rgba(255,255,255,1.0)"
                    onChangeText={this.usernamelText}
                    allowFontScaling={true}/>
                <TextInput 
                    style={styles.input} 
                    placeholder="Password"
                    secureTextEntry={true} 
                    underlineColorAndroid="rgba(255,255,255,1.0)"
                    onChangeText={this.passwordText}
                    allowFontScaling={true}/>
                <TextInput 
                    style={styles.input} 
                    placeholder="Confirm Password"
                    secureTextEntry={true} 
                    underlineColorAndroid="rgba(255,255,255,1.0)"
                    onChangeText={this.confirmpassText}
                    allowFontScaling={true}/>
                <TouchableHighlight 
                    style={styles.emailButton}
                    onPress={this.signUpAction}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white'
    },
    loginButton: {
        margin: 10,
    }, 
    input: {
        marginTop: 15,
        width: '90%',
        height: 45,
        left: '5%',
        borderColor: 'rgba(0,0,0,0.3)',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderWidth: 1,
  
    },buttonText: {
        color: 'white',
        fontFamily: 'Avenir',
        fontSize: 16,
        textAlign: 'center', 
    },
    emailButton: {
        justifyContent: 'center',
        backgroundColor: Color.appColor,
        height:55,
        width: '90%',
        left: '5%',
        borderRadius: 55,
        marginTop: 20,
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup)