import React from 'react'
import {View, SectionList, StyleSheet, Text, FlatList, KeyboardAvoidingView} from 'react-native'
import CommentHeader from '../Components/CommentHeader'
import CommentRow from '../Components/CommentRow'
import CommentSection from '../Components/CommentSection'
import {CreateParseObject} from '../Functions/ParseFunctions'
import Parse from 'parse/react-native'
import {connect} from 'react-redux'

class Comments extends React.Component {
    static navigationOptions = {
        title: 'Comments'
    }

    constructor(props) {
        super(props)
        this.state = {
            videoData: this.props.navigation.state.params.videoData,
            videoComments: []
        }
    }

    componentDidMount = () => {
        console.log(this.state.videoData)
        this.fetchCommentsForVideo()
    }

    fetchCommentsForVideo = () => {
        var videoId = this.state.videoData.id
        Parse.Cloud.run('commentsForVideos', {'videoId': videoId}).then((comments) => {
            this.setState(() => ({
                videoComments: comments
            }))
        })
    }

    submitComment = (value) => {
        var video = CreateParseObject('Videos', this.state.videoData.id)
        var Comment = Parse.Object.extend('VideoComments')
        var submit = new Comment()
        submit.set('User', this.props.users.currentUser)
        submit.set('Video', this.state.videoData)
        submit.set('comment', value)
        submit.save().then((result) => {
            this.fetchCommentsForVideo()
            console.log(result)
        })  
    }

    rowItem = ({item}) =>(
        <CommentRow commentData={item} />
    )

    headerItem = () => (
        <CommentHeader  videoData={this.state.videoData}/> 
    )

    render() {
        return(
            <KeyboardAvoidingView style={styles.main}  behavior="padding" enabled>
                <FlatList 
                    onEndReachedThreshold={1200}
                    data={this.state.videoComments}
                    renderItem={this.rowItem}
                    ListHeaderComponent={this.headerItem}
                    keyExtractor= {(item, index) => index.toString()}
                    style={{backgroundColor: 'white'}}
                /> 
                <CommentSection 
                    style={styles.commentSection} 
                    submitComment={this.submitComment}
                    onPressPost={this.submitComment}/>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
        
    }, 
    sectionList: {
        
    },
    commentSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
        bottom: 0,
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
    }
});

const mapStateToProps = (state) => {
    const {users} = state
    return {users}
}


export default connect(mapStateToProps)(Comments)