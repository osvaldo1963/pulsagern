import React from 'react'
import {View, TouchableHighlight, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ReactionSection extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            likePress: 'white'
        }
    }
    componentDidMount = () => {
        this.setState(() => ({
            likePress: this.props.likeButtonColor
        }))
    }

    likePressed = () => {
        this.props.like()
        this.setState(() => ({
            likePress: 'red'
        }))
    }
    render() {
        const props = this.props
        return(
            <View style={this.props.style}>
                <TouchableHighlight 
                    onPress={this.likePressed} underlayColor="transparent" >
                    <Icon name="heart" style={styles.actionButtonIcon} color={this.state.likePress}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={props.comment} underlayColor="transparent" >
                    <Icon name="comment" style={styles.actionButtonIcon} color="white"/>
                </TouchableHighlight>
                <TouchableHighlight onPress={props.share} underlayColor="transparent">
                    <Icon name="share-alt" style={styles.actionButtonIcon} color="white"/>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    reacttionIcons: {
        position: 'absolute', 
        right: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginRight: 10
    }, 
    actionButtonIcon: {
        fontSize: 18,
        height: 20,
        marginRight: 7,
        marginLeft: 7,
      },
  })