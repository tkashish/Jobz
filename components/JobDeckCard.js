//import liraries
import React, { Component } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import { MapView } from 'expo';
import { Card } from 'react-native-elements';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
// create a component
class JobDeckCard extends Component {
    convertDate(date) {
        var d = new Date(date);
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    }
    render() {
        item = this.props.item;
        let region = {
            latitude: item.lat,
            longitude: item.lng,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02,
        };
        const displayDate = this.convertDate(item.created_at);
        return (
            <Card
                containerStyle={{
                    borderRadius: 40,
                    borderWidth: 0,
                }}
            >
                <View style={styles.cardWrapStyle}>
                    <View style={{ flex: 1, }}>
                        <Text
                            style={{
                                fontSize: width * 0.1,
                                textAlign: "center",
                            }}
                        >
                            {item.company}
                        </Text>
                    </View>
                    <View style={{ flex: 7 }}>
                        <MapView
                            scrollEnabled={false}
                            style={{ flex: 2 }}
                            initialRegion={region}
                            cacheEnabled={Platform.OS == 'android' ? true : false}
                        />
                    </View>
                    <View style={styles.cardSectionStyle}>
                        <Text style={{
                            fontSize: 20,
                        }}>
                            {item.title}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{
                            fontSize: 15,
                        }}>
                            {item.location}
                        </Text>
                        <Text style={{
                            fontSize: 15,
                        }}>
                            {displayDate}
                        </Text>
                    </View>

                </View>
            </Card>
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

//make this component available to the app
export default JobDeckCard;
