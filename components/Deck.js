//import liraries
import React, { Component } from 'react';
import { View, Dimensions, Animated, PanResponder, LayoutAnimation, UIManager } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.1 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

// create a component
class Deck extends Component {

    static defaultProps = {
        onSwipeLeft: () => { },
        onSwipeRight: () => { }
    }

    constructor(props) {
        super(props)
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({
                    x: gesture.dx,
                })
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right')
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left')
                } else {
                    this.resetPosition()
                }
            }
        });

        this.state = { panResponder, position, index: 0 };
    }

    componentWillUnmount() {
        console.log("Deck unmounting");
    }

    componentWillMount() {
        console.log("Deck mounting");
        this.setState({ index: 0 });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data === this.props.data) {
            this.setState({ index: 0 })
        }
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.linear();
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
        Animated.timing(this.state.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => { this.onSwipeComplete(direction) });
    }

    onSwipeComplete(direction) {
        const { onSwipeRight, onSwipeLeft } = this.props;
        direction === 'right' ? onSwipeRight(this.props.data[this.state.index]) : onSwipeLeft();
        this.state.position.setValue({ x: 0, y: 0 });
        this.setState({ index: this.state.index + 1 });
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-2 * SCREEN_WIDTH, 0, 2 * SCREEN_WIDTH],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        };
    }

    componentDidUpdate() {
        console.log("Deck: component did update");
        if (this.state.index >= this.props.data.length) {
            if (this.state.index) {
                this.setState({ index: 0 });
            }
            this.props.renderNoMoreCards();
        }
    }

    componentDidMount() {
        console.log("Deck: component did mount");
        if (this.state.index >= this.props.data.length) {
            if (this.state.index) {
                this.setState({ index: 0 });
            }
            this.props.renderNoMoreCards();
        }
    }

    renderCards() {
        console.log("Deck: renderCards");
        if (this.state.index >= this.props.data.length) {
            console.log("Deck render cards same length");
            return null;
        }
        return this.props.data.map((item, index) => {
            if (index < this.state.index) {
                return null;
            }
            if (index === this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[this.getCardStyle(), styles.cardStyle]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            if (index === this.state.index + 1) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[styles.cardStyle, { top: (index - this.state.index) * 10 }]}>
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            return (
                <Animated.View
                    key={item.id}
                    style={[styles.cardStyle, { top: (index - this.state.index) * 10 }]}>
                    {this.props.renderPlaceholderCard(item)}
                </Animated.View>
            );
        }).reverse();
    }

    render() {
        console.log("Deck rendering");
        return (
            this.renderCards()
        );
    }
}

// define your styles
const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH,
    },
};

//make this component available to the app
export default Deck;
