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
            tabBarVisible: false
        }
    },
    main: {
        screen: createBottomTabNavigator(
            {
                map: {
                    screen: MapScreen,
                    navigationOptions: {
                        tabBarVisible: false
                    }
                },
                deck: {
                    screen: DeckScreen,
                    navigationOptions: {
                        tabBarVisible: false
                    }
                },
                review: {
                    screen: ReviewScreen,
                    navigationOptions: {
                        tabBarVisible: false
                    }
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