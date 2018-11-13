import React from 'react'
import {Text, TextInput, View, TouchableHighlight, StyleSheet, Image, KeyboardAvoidingView, ScrollView} from 'react-native'
import Video from 'react-native-video'
import RNFetchBlob from  'rn-fetch-blob'
import RNThumbnail from 'react-native-thumbnail'
import Parse from 'parse/react-native'
import {connect} from 'react-redux'
const {toDataUrl, ramdomString}  = require('../Functions/Functions')
const {CreateParseObject} = require('../Functions/ParseFunctions')

const UploadButton = (navigation) => (
    <TouchableHighlight style={{right: 18, margin: 10}} onPress={navigation.getParam('upload')} >
        <Text style={{color: 'black'}}>Upload</Text>
    </TouchableHighlight>
)

class UploadVideo extends React.Component {

    constructor(props){
        super(props)   
        this.state = {
            videoUrl: this.props.navigation.state.params.videoUri,
            videoDescription: '',
            videoname: ''
        }
    }
    static navigationOptions = ({navigation}) => {
        return{
            title: 'Video',
            headerRight:  (
                UploadButton(navigation)
            )
        }
    }

    componentDidMount = () => { 
        this.setState(() => ({
            videoname: ramdomString(11)+'.mp4'
        })) 
        this.props.navigation.setParams({ 
            profileType: 'admin',
            upload : this.uploadVideo,
        });
    }
    componentWillUnmount = () => {
        
    }
    leaveScreen = () => {
        this.props.navigation.navigate('BottomTabs')
    }

    uploadVideo = () => {
        console.log('started uploading')
        const serverUrl = "https://mighty-refuge-37669.herokuapp.com/upload"
        RNFetchBlob.fetch('POST', serverUrl, {
            'Content-Type' : 'multipart/form-data',
        }, [{
              name : 'upload',
              filename : this.state.videoname,
              data: RNFetchBlob.wrap(this.state.videoUrl.replace('file://', ''))
        },]).then((res) => {
            console.log(res.text())
            //video uploaded successfuly
                console.log('all good')
                RNThumbnail.get(this.state.videoUrl).then((result) => {
                    console.log(result.path);
                    toDataUrl(result.path, (base64Image) => {
                        var file = new Parse.File("thumbnail.jpg", {base64: base64Image})
                        file.save().then((pic) => {
                            var Video = Parse.Object.extend('Videos')
                            var queryVideo = new Video()
                            queryVideo.set('videoName', this.state.videoname)
                            queryVideo.set('description', this.state.videoDescription)
                            queryVideo.set('videourl', 'https://pulsage.nyc3.digitaloceanspaces.com/'+this.state.videoname)
                            queryVideo.set('User', this.props.users.currentUser)
                            queryVideo.set('views', 0)
                            queryVideo.set('Votes', [])
                            queryVideo.set('hashtags', [])
                            queryVideo.set('name', '')
                            queryVideo.set('thumbnail', pic)
                            queryVideo.save().then((back) => {
                                console.log(back)
                                alert('video finish uploading')
                            }).catch((err) => {
                                alert(err.text())
                            })
                        })
                    })
                })
        }).catch((err) => {
            alert(err.text())
        })
    }
    inputText = (value) => {
        this.setState(() => ({
            videoDescription:value  
        }))
    }
    render() {
        return(    
            <ScrollView >
                <KeyboardAvoidingView style={styles.mainView}>
                    <Video 
                        source={{uri:  this.props.navigation.state.params.videoUri}}  
                        style={styles.videoPlayer} 
                        controls={true}
                        resizeMode="contain"/>
                    <Text style={styles.captionText}>Write a Caption</Text>
                    <TextInput 
                        style={styles.inputText}
                        onChangeText={this.inputText} 
                        multiline={true}/>
                    <TouchableHighlight 
                        style={styles.uploadButton} 
                        onPress={this.uploadVideo}>
                        <Text style={styles.ButtonText}>Upload to Challenge</Text>
                    </TouchableHighlight>
                    <Text style={styles.optionText}>Optional</Text>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    videoPlayer: {
        width: '100%', 
        height: 230, 
        backgroundColor: 'black',
    },
    captionText: {
        fontSize: 17,
        fontWeight: 'bold',
        padding: 20
    },
    inputText: {
        width: '90%',
        height: 200,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 6
    },
    uploadButton: {
        padding: 15,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 6,
        margin: 20,
    },
    ButtonText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    optionText: {
        padding: 10
    }

})

const mapStateToProps = (state) => {
    const {users} = state
    return {users}
}

export default connect(mapStateToProps)(UploadVideo)