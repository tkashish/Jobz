//import liraries
import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';

// create a component
class SettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings',
            headerStyle: {
                marginTop: Platform.OS === 'android' ? 24 : 0,
            }
        };
    };
    render() {
        return (
            <View style={styles.container}>
                <Text>SettingsScreen</Text>
            </View>
        );
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};

//make this component available to the app
export default SettingsScreen;
