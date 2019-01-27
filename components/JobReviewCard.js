//import liraries
import React, { Component } from 'react';
import { View, Text, Dimensions, Platform, ScrollView, Image, Linking, StatusBar } from 'react-native';
import { Button, Card  } from 'react-native-elements';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const BUTTON_COLOR = '#6666ff';

class JobReviewCard extends Component {
    ageOfDate(datePosted) {
        var posted = new Date(datePosted);
        var today = new Date();
        var todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDay());
        var postedUTC = Date.UTC(posted.getFullYear(), posted.getMonth(), posted.getDay());
        return (todayUTC - postedUTC) / (24 * 60 * 60 * 1000);
    }
    render() {
        job = this.props.job;
        return (
            <Card containerStyle={styles.cardSectionStyle}>
                <View
                    style={{
                        height: height * 0.3,
                        width: width * 0.9,
                    }}
                >
                    {
                        job.company_logo &&
                        <Image
                            style={{
                                flex: 3,
                                width: null,
                                height: null,
                                resizeMode: 'contain',
                            }}
                            source={{ uri: job.company_logo }}
                        />
                    }
                    {
                        !job.company_logo &&
                        <Text
                            style={{
                                flex: 2,
                                fontSize: 20,
                                textAlign: "center",
                                borderBottomWidth: 1,
                                fontWeight: 'bold'
                            }}
                        >
                            {job.company}
                        </Text>
                    }
                    <View
                        style={{
                            flex: 5,
                            padding: 10,
                            justifyContent: 'space-around'
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Text>{job.type}</Text>
                            <Text>Posted {this.ageOfDate(job.created_at)} days ago</Text>
                        </View>
                        <Text style={{
                            fontSize: 25,
                            textAlign: "center",
                        }}>
                            {job.title}
                        </Text>
                    </View>
                    <View style={{
                        ...styles.cardSectionStyle,
                        backgroundColor: { BUTTON_COLOR },
                    }}>
                        <Button
                            buttonStyle={styles.buttonStyle}
                            backgroundColor={BUTTON_COLOR}
                            title='Apply'
                            onPress={() => Linking.openURL(job.url)}
                        />
                    </View>
                </View>
            </Card >
        );
    }
}

const styles = {
    container: {
    },
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

export default JobReviewCard;
