import React from 'react';
import {View, Text, Image, TouchableHighlight, StyleSheet} from  'react-native';
const {Color, Font} = require('./Color');
export default class NotiHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            generalTabColor: '',
            personalTabColor: ''
        }
       this.activeTab = this.activeTab.bind(this)
    }

    componentDidMount() {
        this.activeTab('General')
    }

    activeTab(tab) {
        if(tab === 'General') {
            this.setState({
                generalTabColor: 'white', 
                personalTabColor: 'transparent'
            })
        } else if(tab === 'Personal'){
            this.setState({
                generalTabColor: 'transparent', 
                personalTabColor: 'white'
            })
        }
    }
    
    render() {
        return(
            <View style={styles.main}>
                <View style={styles.profileSection}>
                    <Image source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'}} style={styles.profilePicture}/>
                    <View>
                        <Text style={[styles.textColor, styles.textProps]}>Tara Young</Text>
                        <Text style={[styles.textColor]}>New York</Text>
                    </View>
                </View>
                <View style={styles.tabsSection}>
                    <View style={[styles.underLine, {borderBottomColor: this.state.generalTabColor}]}>
                        <TouchableHighlight 
                            style={styles.tabs}
                            onPress = {() => this.activeTab('General')}
                            underlayColor="transparent"  >
                            <Text style={[styles.textColor, styles.textProps]}>General</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.underLine, {borderBottomColor: this.state.personalTabColor}]}>
                        <TouchableHighlight 
                            style={[styles.tabs]}
                            onPress = {() => this.activeTab('Personal')}
                            underlayColor="transparent" >
                            <Text style={[styles.textColor, styles.textProps]}>Personal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: Color.appColor
    },
    profileSection: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    profilePicture: {
        height: 90, width: 90, 
        margin: 20,
        borderRadius: 45,
        borderColor: Color.appColor,
        borderWidth: 2,
    }, 
    textProps: {
       fontSize: 16,
       fontFamily: Font.appFontFamily,
    },
    textColor: {
        color: 'white'
    },
    tabsSection: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    }, 
    tabs: { 
        width: '100%',
        height: 50,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    underLine: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        borderBottomWidth: 4,
    }
});

