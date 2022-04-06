import React from 'react';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import {RootNavigationContainer} from '@config';
import {persistor, store} from '@store';

// importing reactotron for logging console, network & state management if env === dev
if (__DEV__)
  import('./config/dev/reactotron').then(() =>
    console.log('Reactotron configured'),
  );

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <RootNavigationContainer />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
