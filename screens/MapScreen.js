//import liraries
import React, { Component } from 'react';
import { View, ActivityIndicator, Dimensions, StatusBar } from 'react-native';
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
        region: {
            latitude: 37,
            longitude: -122,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
        },
        mapLoaded: false
    }

    componentDidMount() {
        this.setState({ mapLoaded: true });
    }

    onRegionChangeComplete = region => {
        console.log("rending map");
        
        this.setState({ region })
    }

    onButtonPress = () => {
        this.props.fetchJobs(this.state.region, this.props.navigation.navigate)
    }

    navigateTo = (route, restoreCurrentScreen) => {
        console.log("navigating to " + route);
        if (route == 'map') {
            restoreCurrentScreen()
            return
        }
        this.props.navigation.navigate(route)
    }

    render() {
        if (!this.state.mapLoaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator></ActivityIndicator>
                </View>
            );
        }
        console.log("rendering");
        
        return (
            // <NavigatableScreen navigation={this.props.navigation} navigate={this.navigateTo} style={{ backgroundColor: '#fff' }}>
                <View style={{ flex: 1, width: width, justifyContent: 'center', alignItems: 'center' }}>
                    <StatusBar translucent />
                    <MapView
                        style={{ flex: 1, width: width }}
                        initialRegion={this.state.region}
                        onRegionChangeComplete={this.onRegionChangeComplete}
                    />
                    <View style={styles.container}>
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

            // </NavigatableScreen>
        );
    }
}

// define your styles
const styles = {
    container: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    },
    buttonStyle: {
        borderRadius: 50,
        backgroundColor: BUTTON_COLOR
    },
    buttonTitleStyle: {
        fontWeight: "500",
        fontSize: height * 0.03,
    }
};

//make this component available to the app
export default connect(null, actions)(MapScreen);
