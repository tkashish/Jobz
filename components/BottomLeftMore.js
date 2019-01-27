import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, Animated, View } from 'react-native';
import { Icon } from 'react-native-elements';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const BUTTON_HEIGHT = 50;
const BUTTON_GAP = 10;
const BUTTON_POSITION_BOTTOM = 20;
const BUTTON_POSITION_RIGHT = 20;
const BUTTON_COLOR = '#6666ff';

class BottomLeftMore extends Component {
    constructor(props) {
        super(props);
        this.animated = false;
        this.ShowMenuAnim = new Animated.Value(0);
    }

    onPress = () => {
        val = this.animated ? 0 : 1;
        this.animateMenu(val);
    }

    animateMenu = (val) => {
        this.animated = !this.animated;
        Animated.spring(
            this.ShowMenuAnim,
            {
                toValue: val,
                friction: 7
            }
        ).start();
    }

    onPressButton = (buttonPressFunc) => {
        return () => {
            buttonPressFunc();
            this.animateMenu(0);
        }
    }

    renderOtherIcons = () => {
        return this.props.buttons.map((b, index) => {
            const iconPosition = this.ShowMenuAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [BUTTON_POSITION_BOTTOM, BUTTON_POSITION_BOTTOM + (index + 1) * (BUTTON_HEIGHT + BUTTON_GAP)]
            });
            const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
            return (
                <AnimatedTouchable
                    key={index}
                    onPress={this.onPressButton(b.onPress)}
                    style={[styles.moreVertStyle, { bottom: iconPosition }]}
                >
                    <Icon name={b.iconName} iconStyle={styles.iconStyle} />
                </AnimatedTouchable>
            );
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
                {this.renderOtherIcons()}
                <TouchableOpacity
                    style={styles.moreVertStyle}
                    onPress={this.onPress}
                >
                    <Icon name={"more-vert"} size={30} color={BUTTON_COLOR} iconStyle={styles.iconStyle} />
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = {
    container: {
        height: height * 0.9 ,
        width: width,
        position: 'absolute',

    },
    moreVertStyle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: BUTTON_HEIGHT,
        height: BUTTON_HEIGHT,
        backgroundColor: BUTTON_COLOR,
        borderRadius: BUTTON_HEIGHT,
        bottom: BUTTON_POSITION_BOTTOM,
        right: BUTTON_POSITION_RIGHT,
    },
    iconStyle: {
        color: '#fff'
    }
};

export default BottomLeftMore;
