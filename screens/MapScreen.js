//import liraries
import React, { Component } from 'react';
import { View, ActivityIndicator, Dimensions, Modal, Text } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button } from 'react-native-elements';
import NavigatableScreen from '../components/NavigatableScreen';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const BUTTON_COLOR = '#6666ff';

class MapScreen extends Component {
    state = {
        mapLoaded: false,
        noJobFound: false,
    }

    constructor(props) {
        super(props)
        this.noJobFound = false;
    }

    componentDidMount() {
        this.setState({ mapLoaded: true });
        this.setState({ noJobFound: false });
    }

    onRegionChangeComplete = region => {
        this.props.updateCurrentRegion(region);
    }

    onButtonPress = async () => {
        this.setState({ mapLoaded: false, noJobFound: false });
        s = await this.props.fetchJobs(this.props.navigation.navigate);
        this.setState({ mapLoaded: true });
        if (s !== undefined) {
            this.setState({ noJobFound: true });
        }
    }

    navigateTo = (route, restoreCurrentScreen) => {
        console.log("navigating to " + route);
        if (route == 'map') {
            restoreCurrentScreen();
            return
        }
        this.props.navigation.navigate(route);
    }

    render() {
        console.log("MapScreen render");
        if (!this.state.mapLoaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator></ActivityIndicator>
                </View>
            );
        }
        noJobFoundNotification = null
        if (this.state.noJobFound) {
            noJobFoundNotification =
                <View style={styles.noJobMessageContainerStyle}>
                    <Text style={styles.noJobMessageTextStyle}>No jobs found in this area</Text>
                </View>
        }
        return (
            <NavigatableScreen navigation={this.props.navigation} navigate={this.navigateTo} style={{ backgroundColor: '#fff' }}>
                <View style={{ flex: 1, width: width, justifyContent: 'center', alignItems: 'center' }}>
                    <MapView
                        style={{ flex: 1, width: width }}
                        initialRegion={{
                            latitude: 37,
                            longitude: -122,
                            latitudeDelta: 0.09,
                            longitudeDelta: 0.04,
                        }}
                        onRegionChangeComplete={this.onRegionChangeComplete}
                    />
                    <View style={styles.container}>
                        {noJobFoundNotification}
                        <Button
                            large
                            title="Search this area"
                            textStyle={styles.buttonTitleStyle}
                            buttonStyle={styles.buttonStyle}
                            icon={{ name: 'search' }}
                            onPress={this.onButtonPress}
                        />
                    </View>
                </View>

            </NavigatableScreen>
        );
    }
}

// define your styles
const styles = {
    container: {
        position: 'absolute',
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        width: width * 0.95,
        borderRadius: 50,
        backgroundColor: BUTTON_COLOR
    },
    buttonTitleStyle: {
        fontWeight: "500",
        fontSize: height * 0.03,
    },
    noJobMessageContainerStyle: {
        width: width * 0.5,
        bottom: 10,
        backgroundColor: '#ff9999',
        height: height * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: height * 0.1
    },
    noJobMessageTextStyle: {
        color: '#fff',
        fontSize: height * 0.02,
    }
};

export default connect(null, actions)(MapScreen);
