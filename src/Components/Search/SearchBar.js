import React from 'react'
import {View, TextInput, TouchableHighlight, Image, StyleSheet} from 'react-native'

export default class SearchBar extends React.Component {
    render() {
        return(
            <View style={styles.mainView}> 
            <TextInput 
                placeholder="Search" 
                style={styles.searchInput} 
                underlineColorAndroid="rgba(255,255,255,1.0)"
                {...this.props} />
            <TouchableHighlight 
                style={styles.buttomSearch}
                onPress={this.props.onPressSearch} >
                <Image 
                    source={require('../../Images/search.png')} 
                    style={styles.buttomImage} />
            </TouchableHighlight>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        width: '100%', 
        height: 60,
        backgroundColor: 'white', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5,
    },
     searchInput: {
        flex: 1,
        top: 0,
        height: '80%', 
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: 'lightgray',
        marginLeft: 15, 
        marginRight: 15,
        textAlign: 'center', 
     }, 
    buttomSearch: {
        right: 30,
        height: 20,
        width: 20,
        position: 'absolute',
        justifyContent: 'center'
    },
    buttomImage: {
        height: 20,
        width: 20,
        resizeMode : 'stretch',
        position: 'absolute',
        justifyContent: 'center'
    }
})