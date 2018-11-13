import React from 'react'
import {KeyboardAvoidingView , Text, TextInput, TouchableHighlight, StyleSheet} from 'react-native'
import Parse from 'parse/react-native'
import {connect} from 'react-redux'

const Settings = (navigation) => (
    <TouchableHighlight style={{right: 18}} onPress={navigation.getParam('create')} >
        <Text>Create</Text>
    </TouchableHighlight>
)
const LeftButton = (navigation) => (
    <TouchableHighlight style={{left:18 }} onPress={navigation.getParam('back')} >
        <Text>Back</Text>
    </TouchableHighlight>
)

class CreateChallenge extends React.Component {
    static navigationOptions = ({navigation}) => {
        return{
            title: null,
            headerRight:  Settings(navigation),
            headerLeft: LeftButton(navigation)
        }
    }

    constructor(props){
        super(props)
        this.state = {
            description: ''
        }
    }

    componentDidMount = () => {
        this.props.navigation.setParams({ 
            create : this.createChallenge,
            back: this.closePage
        });
    }

    createChallenge = () => {
        if(this.state.description === ""){
            const Create = Parse.Object.extend('Challenges')
            const createQuery = new Create()
            createQuery.set('active', true)
            createQuery.set('User', this.props.users.currentUser)
            createQuery.set('reward', '')
            createQuery.set('dayEnds', '')
            createQuery.set('sponsor', false)
            createQuery.set('description', this.state.description)
            createQuery.save().then((back) => {
                console.log(back)
                if(back){
                    this.closePage()
                }
            }) 
        } else {

        }
    }

    closePage = () => {
        this.props.navigation.navigate('BottomTabs')
    }

    render() {
        return(
            <KeyboardAvoidingView style={styles.mainView}>
                <Text style={styles.challengeText}>What's the challenge?</Text>
                <TextInput 
                    style={styles.challengeInput} 
                    onChangeText={(value) => this.setState(() => ({ description: value}))}
                    multiline={true}/>
                <TouchableHighlight style={styles.backdropButton}>
                    <Text style={styles.backdropButtonText}>Choose Challenge Backdrop</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    mainView:  {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    challengeText: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'left',
    },
    challengeInput: {
        borderRadius: 6,
        width: '90%',
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
    },
    backdropButton: {
        padding: 15,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 6,
        margin: 20,
    },
    backdropButtonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    }
})

const mapStateToProps = (state) => {
    const {users} = state
    return {users}
}

export default connect(mapStateToProps)(CreateChallenge)