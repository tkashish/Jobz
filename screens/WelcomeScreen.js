import _ from 'lodash';
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';
import { AppLoading } from 'expo';

const SLIDE_DATA = [
    { text: 'Welcome to JobApp' },
    { text: 'Use this to get a job' },
    { text: 'Set your location, then swipe away' }
];

// create a component
class WelcomeScreen extends Component {
    state = { token: null }

    async componentWillMount() {
        let token = await AsyncStorage.getItem('fb_token');
        if (token) {
            this.props.navigation.navigate('map')
            this.setState({ token });
        } else {
            this.setState({ token: false });
        }
    }

    onSlidesComplete = () => {
        this.props.navigation.navigate('auth')
    }

    render() {
        if (_.isNull(this.state.token)) {
            <AppLoading></AppLoading>
        }
        return (
            <View style={styles.container}>
                <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
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
        backgroundColor: '#2c3e50',
    },
};

//make this component available to the app
export default WelcomeScreen;
