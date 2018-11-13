import React from 'react'
import {View, ScrollView} from 'react-native'
import { List, ListItem } from 'react-native-elements'
import Parse from 'parse/react-native'
const list = [
    {
      title: 'Edit Profile',
      icon: 'edit'
    },
    {
      title: 'Bussiness Profile',
      icon: 'business'
    },
    {
        title: 'Terms & Conditions',
        icon: 'file'
    },
    {
        title: 'Privacy Policy',
        icon: 'policy'
    },
    {
        title: 'Open Source Libraries',
        icon: 'library'
    },
]

export default class Settings extends React.Component {
    
    itemPressed = (item) => {
        switch(item) {
            case 'edit':
                
                break;
            case 'business':
                
                break;
            case 'file':
                
                break;
            case 'policy':
                
                break;
            case 'library':
                break;
            default:
                
        }
    }

    listItems = list.map((item) => (
            <ListItem
                key={item.title}
                title={item.title}
            />
    ))
   
    
    render() {
        return(
            <ScrollView scrollEnabled={true} style={{flex: 1}}>
                <List>{this.listItems}</List>
            </ScrollView>
        )
    }
}