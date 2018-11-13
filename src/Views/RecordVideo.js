import React from 'react'
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native'

import  Camera, { RNCamera } from 'react-native-camera';

const LeftButton = (navigation) => (
    <TouchableHighlight style={{left:18 }} onPress={navigation.getParam('back')} >
        <Text>Back</Text>
    </TouchableHighlight>
)

export default class ReacordVideo extends React.Component {

    static navigationOptions = ({navigation}) => {
        return{
            title: 'Record Video',
            headerLeft: LeftButton(navigation)
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            isRecording: false,
            buttonColor: '#AFB1B0'
        }
    }

    componentDidMount = () => {
        this.props.navigation.setParams({ 
            back: this.closePage
        });
    }

    closePage = () => {
        this.props.navigation.navigate('BottomTabs')
    }


    recordButton = () => {
        if(this.state.isRecording === false){
            this.recordVideo()
        } else {
            this.stopRecording()
        }
    }

     async recordVideo(){
        if(this.camera){ 
            this.setState(() => ({
                isRecording: true,
                buttonColor: 'red'
            }))
            const options = {quality: RNCamera.Constants.VideoQuality["1080p"]}
            const { uri, codec = "mp4" } = await this.camera.recordAsync(options)
            
            if(uri) {
                console.log(codec)
                this.props.navigation.navigate('Uploadvideo', {videoUri: uri})
            }
            
        }
    }

    stopRecording = () => {
        this.camera.stopRecording()
        this.setState(() => ({
            isRecording: false,
            buttonColor: '#AFB1B0'
        }))
     
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <RNCamera
                    ref={cam => {
                        this.camera = cam
                    }}
                    style={styles.preview}
                    ype={RNCamera.Constants.Type.back}
                    captureAudio={true}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'} >
                    <TouchableHighlight 
                        onPress={() => { this.recordButton()}} 
                        style={[styles.camptureButton, {backgroundColor: this.state.buttonColor}]}
                        underlayColor="transparent">
                        <View style={{flex: 1}}></View>
                    </TouchableHighlight>
                    
                </RNCamera>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    camptureButton: {
        position: 'absolute',
        borderRadius: 40, 
        borderColor: 'white',
        borderWidth: 6,
        width: 80,
        height: 80,
        bottom: 30,
      
    },
    
  });