import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import AppContainer from './BottomNavigator';
import { AsyncStorage } from 'react-native';




export default class App extends React.Component {
  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  }
  render() {
    return (
      <Provider store={store} >
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

