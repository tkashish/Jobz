import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

const MainNavigator = createBottomTabNavigator({
    welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
            tabBarVisible: false
        }
    },
    auth: {
        screen: AuthScreen,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    main: {
        screen: createStackNavigator({
            map: {
                screen: MapScreen
            },
            deck: {
                screen: DeckScreen
            },
            review: {
                screen: createStackNavigator({
                    review: { screen: ReviewScreen },
                    settings: { screen: SettingsScreen }
                }),
            }
        },
            {
                headerMode: 'none',
                navigationOptions: {
                    headerVisible: false,
                }
            }
        ),
        navigationOptions: {
            tabBarVisible: false
        }
    }
},
    {
        lazy: true
    }
);
const AppContainer = createAppContainer(MainNavigator)

export default AppContainer;