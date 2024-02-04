import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './src/types/navigation';
import MainStackNavigator from './src/routes/MainStackNavigator';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
