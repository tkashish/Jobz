import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, TouchableOpacity, Easing, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const navigationList = ['map', 'review', 'logout'];
const COLOR = '#6666ff';

class TouchableWithoutOpacity extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={1} style={this.props.style} onPress={this.props.onPress}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}

class NavigatableScreen extends Component {

    constructor(props) {
        super(props);
        this.ShowMenuAnim = new Animated.Value(0);
        this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.hide();
            }
        );
    }

    componentWillMount() {
        this.ShowMenuAnim = new Animated.Value(1);
        this.hide();
    }

    show = () => {
        Animated.timing(
            this.ShowMenuAnim, {
                toValue: 1,
                duration: 500,
                easing: Easing.elastic(0.5)
            }).start()
    }

    hide = () => {
        Animated.timing(
            this.ShowMenuAnim, {
                toValue: 0,
                duration: 500,
                easing: Easing.elastic(0.5)
            }).start()
    }

    renderNavigationList = (item) => {
        let onPressFunc = () => this.props.navigate(item, this.hide);
        if (item == 'logout') {
            onPressFunc = () => this.props.facebookLogout(this.props.navigate);
        }
        return (
            <TouchableWithoutFeedback onPress={onPressFunc}>
                <Text style={{ fontSize: Math.floor(SCREEN_WIDTH * 0.08), fontWeight: '300', marginTop: SCREEN_HEIGHT * 0.05, color: '#8080ff' }}>{_.capitalize(item)}</Text>
            </TouchableWithoutFeedback>
        );
    }

    render() {
        console.log("Navigatable Screen Rendered");
        
        const iconPosition = this.ShowMenuAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [SCREEN_WIDTH, -100]
        });
        const screenLeft = this.ShowMenuAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, SCREEN_WIDTH * 0.7]
        });
        const screenHeight = this.ShowMenuAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [SCREEN_HEIGHT, SCREEN_HEIGHT * 0.7]
        });
        const borderRadius = this.ShowMenuAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, SCREEN_WIDTH / 50]
        });
        const listPosition = this.ShowMenuAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, SCREEN_WIDTH]
        });

        const AnimatedTouchable = Animated.createAnimatedComponent(TouchableWithoutOpacity);

        return (
            <View style={styles.screenStyle}>
                <Animated.View style={{ left: listPosition, paddingTop: SCREEN_HEIGHT * 0.1, paddingLeft: SCREEN_WIDTH * 0.05, width: SCREEN_WIDTH * 0.7 }}>
                    <Text style={{ fontSize: Math.floor(SCREEN_WIDTH * 0.2), fontWeight: 'bold', marginBottom: 30, color: '#4d4dff' }}>Jobz</Text>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={navigationList}
                        renderItem={({ item }) => this.renderNavigationList(item)}
                        keyExtractor={(item) => item}
                    />
                </Animated.View>
                {/* figure out how to use touchable here */}
                <Animated.View
                    style={[styles.containerStyle, this.props.style, { left: screenLeft, height: screenHeight, borderRadius: borderRadius }]}
                    onPress={this.hide}
                >
                    {this.props.children}
                </Animated.View>
                <Animated.View style={[styles.iconStyle, { left: iconPosition }]}>
                    <Icon
                        color='#fff'
                        underlayColor={COLOR}
                        name='menu'
                        onPress={this.show}
                        size={SCREEN_HEIGHT * 0.05}
                    />
                </Animated.View>
            </View >
        );
    }
}

const styles = {
    screenStyle: {
        flex: 1,
        left: -SCREEN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: SCREEN_WIDTH * 2
    },
    iconStyle: {
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.05,
        left: 0,
        backgroundColor: COLOR,
        height: SCREEN_HEIGHT * 0.07,
        width: SCREEN_WIDTH * 0.15,
        borderTopRightRadius: SCREEN_WIDTH / 20,
        borderBottomRightRadius: SCREEN_WIDTH / 20,
        shadowColor: ' #000000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.1,
        elevation: 1,
        paddingRight: SCREEN_WIDTH * 0.02,
        justifyContent: 'center',
        opacity: 100,
    },
    containerStyle: {
        backgroundColor: '#4dd2ff',
        shadowColor: 'black',
        shadowColor: ' #000000',
        shadowOffset: { width: -5, height: 5 },
        shadowOpacity: 0.1,
        elevation: 1,
    },
    scrollViewContent: {
        marginTop: SCREEN_HEIGHT * 0.3,
    },
};

export default connect(null, actions)(NavigatableScreen);
