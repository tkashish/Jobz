import _ from 'lodash';
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';
import { AppLoading } from 'expo';

const SLIDE_DATA = [
    { text: 'Welcome to Jobz' },
    { text: 'Use this to get a job' },
    { text: 'Set your location, then swipe away' }
];

class WelcomeScreen extends Component {
    state = { token: null }

    async componentWillMount() {
        console.log("WelcomeScreen componentWillMount");
        let token = await AsyncStorage.getItem('fb_token');
        if (token) {
            this.props.navigation.navigate('map')
            this.setState({ token });
        } else {
            this.setState({ token: false });
        }
    }

    onSlidesComplete = () => {
        console.log("WelcomeScreen Navigate to auth");
        this.props.navigation.navigate('auth', {reauthenticate: true})
    }

    componentWillReceiveProps(nextProps) {
        console.log("WelcomeScreen componentWillReceiveProps");
        if (nextProps.navigation.state.params.canceled) {
            console.log("WelcomeScreen componentWillReceiveProps canceled");
        }
    }

    componentWillUpdate() {
        console.log("WelcomeScreen componentWillUpdate");
    }

    render() {
        console.log("WelcomeScreen render");

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

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
};

export default WelcomeScreen;
