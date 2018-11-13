import React from 'react';
import {View, Image, Text, StyleSheet, TextInput, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux'
import FastImage from 'react-native-fast-image'

class CommentSection extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            comment: ''
        }
    }

    commentInput = (value) => {
        this.setState(() => ({
            comment: value
        }))
    }

    render() {
        return(
            <View style={this.props.style}>
                <FastImage 
                    source={{
                        uri: this.props.users.currentUser.get('profilePicture').url(),
                        headers:{  Authorization: 'someAuthToken' }, 
                        priority: FastImage.priority.normal
                    }} 
                    style={styles.profilePicture}
                    
                    resizeMode="cover" />
                <TextInput 
                    placeholder="Write a comment..." 
                    style={styles.commentInput}
                    onChangeText={this.commentInput} />
                <TouchableHighlight style={styles.postButton} onPress={() => this.props.onPressPost(this.state.comment)}>
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profilePicture: {
        width: 40, height: 40,
        borderRadius: 20,
        margin: 10,
    },
    commentInput: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
    },
    postButton: {
        paddingRight: 10,
    },
    postButtonText: {
        fontWeight: 'bold',
    }
});

const mapStateToProps = (state) => {
    const {users} = state
    return {users}
}

export default connect(mapStateToProps)(CommentSection)