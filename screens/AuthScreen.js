import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { StackActions, NavigationActions } from 'react-navigation';

class AuthScreen extends Component {
    componentDidMount() {
        console.log("AuthScreen componentDidMount");
        this.props.facebookLogin(this.props.navigation.navigate);
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.navigation.state.params.reauthenticate) {
            this.props.navigation.setParams({ reauthenticate: false });
            this.props.facebookLogin(this.props.navigation.navigate);
        }
        this.onAuthComplete(nextProps)
    }

    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('map')
        }
    }

    render() {
        return (
            <View />
        );
    }
}

mapStateToProps = ({ auth }) => {
    token = auth ? auth.token : null
    return {
        token
    }
}
export default connect(mapStateToProps, actions)(AuthScreen);
