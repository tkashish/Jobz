//import liraries
import React, { Component } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Deck from '../components/Deck';
import { Card } from 'react-native-elements';
import * as actions from '../actions';
import JobDeckCard from '../components/JobDeckCard';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
class DeckScreen extends Component {
    renderCard = (item) => {
        return (
            <JobDeckCard item={item} />
        );
    }

    renderNoMoreCards = () => {
        console.log('render no more cards');
        this.props.navigation.navigate('review');
    }

    renderPlaceholderCard = () => {
        return (
            <Card
                containerStyle={{
                    borderRadius: 40,
                    borderWidth: 0,
                }}
            >
                <View style={styles.cardWrapStyle}></View>
            </Card>
        );
    }

    componentWillMount(){
        console.log("DeckScreen will mount");
    }

    componentWillUpdate(){
        console.log("DeckScreen will update");
    }

    render() {
        console.log("DeckScreen rendering");
        return (
            <View style={styles.container}>
                <StatusBar translucent />
                <Deck
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderPlaceholderCard={this.renderPlaceholderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    onSwipeRight={(job) => this.props.likeJob(job)}
                />
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    cardWrapStyle: {
        flex: 1,
        height: height * 0.9,
        justifyContent: 'space-between',
    },
    buttonStyle: {
        width: width * 0.8
    },
    cardSectionStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
};

const mapStateToProps = (state) => {
    return {
        jobs: state.jobs
    }
}

export default connect(mapStateToProps, actions)(DeckScreen);
