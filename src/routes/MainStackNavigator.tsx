import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChevronIcon} from '../icons/ChevronIcon';
import MainScreen from '../screens/MainScreen/MainScreen';
import CharacterScreen from '../screens/CharacterScreen/CharacterScreen';
import {CharacterScreenProps} from '../types/navigation';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CharacterScreen"
        component={CharacterScreen}
        options={({navigation, route}) => ({
          headerTitle: (route.params as CharacterScreenProps).name,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerLeftWrapper}
              onPress={() => navigation.goBack()}>
              <ChevronIcon disabled={false} left />
              <Text style={styles.headerLeftText}>Back</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({
  headerLeftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    gap: 8,
  },
  headerLeftText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});
