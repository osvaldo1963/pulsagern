import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addCurrentUser} from '../Reducer/UserAction'

const {LogIn} = require('../Functions/Auth')
const {Color} = require('../Components/Color');
class Login extends React.Component {
    static navigationOptions = {
        title: 'Log In'
    }

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    goToHomePage = () => {
        this.props.navigation.navigate('BottomTabs')
    }

    emailText = (input) => {
        this.setState({
            email: input
        })
    }
    
    passwordText = (input) => {
        this.setState({
            password: input
        })
    }

    loginAction = () => {
        
        LogIn(this.state.email, this.state.password, (err, result) => {
            console.log(result)
            console.log(err)
            if(result) {
                this.props.addCurrentUser(result)
                this.goToHomePage()
            } else {
                alert('Error', err)
            }
        })
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
                    allowFontScaling={true} />
                <TextInput 
                    style={styles.input} 
                    placeholder="Password"
                    secureTextEntry={true} 
                    underlineColorAndroid="rgba(255,255,255,1.0)"
                    onChangeText={this.passwordText} 
                    allowFontScaling={true}/>
                <TouchableHighlight 
                    style={styles.emailButton}
                    onPress={this.loginAction}>
                        <Text style={styles.buttonText}>Log In</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)