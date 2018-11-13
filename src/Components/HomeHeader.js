import React from 'react';
import {View, Text, Image, StyleSheet, SectionList, TouchableHighlight} from 'react-native';
import {Divider } from 'react-native-elements';
const {Color } = require('../Components/Color')
export default class HomeHeader extends React.Component {

    pictureOnPress(index) {
        this.props.profilePress(index)
    }
    render() {
        return(
            <View>
                <View style={styles.headerSection}>
                    <Text style={styles.headerText}>Artist Specials</Text>
                </View>
                <SectionList
                    renderItem={({item, index, section}) =>
                        <TouchableHighlight 
                            onPress={() => this.pictureOnPress(index)}>
                            <Image 
                                source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'}} 
                                style={styles.profilePicture}/>
                        </TouchableHighlight>
                    }
                    sections={[
                        {title: 'Title1', data: ['item1', 'item2', 'item1', 'item2','item1', 'item2']},
                    ]}            
                    keyExtractor={(item, index) => item + index}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <Divider style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} style={{width: '92%', left: '4%'}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerSection: {
        left: 15,
        width: 130,
        borderColor: Color.appColor,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderWidth: 2,
    },
    headerText: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 0, 
        fontSize: 18, 
        fontWeight: 'bold', 
        width: 160,
    },
    profilePicture: {
        width:70,height: 70, 
        margin: 15, 
        borderRadius: 35
    }
});