import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/routes/MainStackNavigator';
import {RootStackParamList} from './src/types/navigation';

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
