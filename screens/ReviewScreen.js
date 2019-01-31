//import liraries
import React, { Component } from 'react';
import { View, Dimensions, ScrollView, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import BottomLeftMore from '../components/BottomLeftMore';
import JobReviewCard from '../components/JobReviewCard';
import NavigatableScreen from '../components/NavigatableScreen';
import * as actions from '../actions';

// create a component
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const BUTTON_COLOR = '#6666ff';

class ReviewScreen extends Component {

    renderLikedJobs = () => {
        if (!this.props.jobs || this.props.jobs.length == 0) {
            return null;
        }
        return this.props.jobs.map(job => {
            return (
                <JobReviewCard key={job.id} job={job} />
            )
        });
    }

    onPressButton1 = () => {
        console.log("onPressButton1");
        this.props.clearJobs();
    }

    buttonProp = (onPress, iconName) => {
        return {
            onPress,
            iconName
        }
    }

    navigateTo = (route, restoreCurrentScreen) => {
        console.log("navigating to " + route);
        if (route == 'review') {
            restoreCurrentScreen()
            return
        }
        this.props.navigation.navigate(route)
    }

    componentWillMount() {
        console.log("ReviewScreen will mount");
    }

    componentWillUpdate() {
        console.log("ReviewScreen will update");
    }

    render() {
        console.log("ReviewScreen rendering");
        if (this.props.jobs.length == 0) {
            return (
                <NavigatableScreen navigation={this.props.navigation} navigate={this.navigateTo} style={{ backgroundColor: '#fff' }}>
                    <View style={{ flex: 1, width: width, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>No jobs selected</Text>
                    </View>
                </NavigatableScreen>
            );
        }
        return (
            <NavigatableScreen navigation={this.props.navigation} navigate={this.navigateTo} style={{ backgroundColor: '#fff' }}>
                <View style={{ flex: 1, width: width, justifyContent: 'center', alignItems: 'center' }}>
                    <BottomLeftMore
                        buttons={[
                            this.buttonProp(this.onPressButton1, 'delete'),
                        ]}
                    >
                        <FlatList
                            data={this.props.jobs}
                            renderItem={({ item }) => <JobReviewCard key={item.id} job={item} />}
                            keyExtractor={(item, index) => item.id}
                        />
                    </BottomLeftMore>
                </View>
            </NavigatableScreen>
        );
    }
}


navigate = () => {
    this.props.navigation.navigate('settings')
}

const styles = {
    buttonStyle: {
        width: width * 0.6,
        borderRadius: 50
    },
    cardSectionStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    iconStyle: {
        borderWidth: 1
    }
};

mapStateToProps = (state) => {
    return {
        jobs: state.likedJobs
    }
}
export default connect(mapStateToProps, actions)(ReviewScreen);
