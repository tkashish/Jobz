//import liraries
import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const Screen_WIDTH = Dimensions.get('window').width;

// create a component
class Slides extends Component {

    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                <Button
                    title="Login"
                    raised
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
                />
            );
        }
    }

    renderSlides() {
        return this.props.data.map((s, index) => {
            return (
                <View key={s.text} style={styles.slideStyle}>
                    <Text style={styles.textStyle}>
                        {s.text}
                    </Text>
                    {this.renderLastSlide(index)}
                </View>
            );
        });
    }
    render() {
        return (
            <ScrollView
                horizontal
                style={{ flex: 1 }}
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView >
        );
    }
}

// define your styles
const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Screen_WIDTH,
        backgroundColor: '#fff'
    },
    textStyle: {
        fontSize: 40
    },
    buttonStyle: {
        backgroundColor: '#1E90FF',
        borderRadius: 20,
        marginTop: 40,
        width: Screen_WIDTH*0.5,
    }
};

//make this component available to the app
export default Slides;
