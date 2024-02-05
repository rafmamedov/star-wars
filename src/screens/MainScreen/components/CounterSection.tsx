import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Character} from '../../../types/types';

type Props = {
  clearCounter: () => void;
  femaleCounter: Character[];
  maleCounter: Character[];
  othersCounter: Character[];
};

export const CounterSection: React.FC<Props> = ({
  clearCounter,
  femaleCounter,
  maleCounter,
  othersCounter,
}) => {
  return (
    <View style={styles.topSectionContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Fans</Text>

        <TouchableOpacity onPress={clearCounter} style={styles.clearButton}>
          <Text style={styles.clearText}>CLEAR FANS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.counterSection}>
        <View style={[styles.counterContainer, styles.shadowProp]}>
          <Text style={styles.counter}>{femaleCounter.length}</Text>
          <Text style={styles.label}>Female Fans</Text>
        </View>

        <View style={[styles.counterContainer, styles.shadowProp]}>
          <Text style={styles.counter}>{maleCounter.length}</Text>
          <Text style={styles.label}>Male Fans</Text>
        </View>

        <View style={[styles.counterContainer, styles.shadowProp]}>
          <Text style={styles.counter}>{othersCounter.length}</Text>
          <Text style={styles.label}>Others</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topSectionContainer: {
    gap: 16,
  },
  counter: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontFamily: 'InterThin-Bold',
    fontWeight: '300',
    color: '#000',
    fontSize: 30,
  },
  clearButton: {
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  clearText: {
    color: 'red',
  },
  label: {
    color: '#000',
  },
  counterSection: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 16,
  },
  counterContainer: {
    gap: 8,
    flex: 1,
    padding: 12,
    height: 80,
    borderRadius: 6,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  shadowProp: {
    elevation: 10,
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
  },
});
