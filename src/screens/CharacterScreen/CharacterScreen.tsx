import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RouteProp, ParamListBase} from '@react-navigation/native';
import {CharacterScreenProps} from '../../types/navigation';
import {getDetails} from '../../api/api';
import {CharacterDetails} from '../../types/types';

type Props = {
  route: RouteProp<ParamListBase, 'CharacterScreen'>;
};

const CharacterScreen: React.FC<Props> = ({route}) => {
  const url = (route.params as CharacterScreenProps).url;
  const [character, setCharacter] = useState<CharacterDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const getDetailsFromServer = async () => {
    setLoading(true);

    try {
      const fetchedDetails = await getDetails(url);
      const homeworld = await getDetails(fetchedDetails.homeworld);

      setCharacter({...fetchedDetails, homeworld: homeworld.name});
    } catch (error) {
      console.log('fetch error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailsFromServer();
  }, []);

  return (
    <View style={styles.section}>
      {loading ? (
        <Text style={styles.value}>loading...</Text>
      ) : (
        <View style={styles.descriptionContainer}>
          <View style={styles.wrapper}>
            <Text style={styles.title}>Character's name:</Text>
            <Text style={styles.value}>{character?.name}</Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.title}>Character's planet:</Text>
            <Text style={styles.value}>{character?.homeworld}</Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.title}>Birth year:</Text>
            <Text style={styles.value}>{character?.birth_year}</Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.title}>Gender:</Text>
            <Text style={styles.value}>{character?.gender}</Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.title}>Eye color:</Text>
            <Text style={styles.value}>{character?.eye_color}</Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.title}>Hair color:</Text>
            <Text style={styles.value}>{character?.hair_color}</Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.title}>Skin color:</Text>
            <Text style={styles.value}>{character?.skin_color}</Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.title}>Character's mass:</Text>
            <Text style={styles.value}>{character?.mass}</Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.title}>Character's height:</Text>
            <Text style={styles.value}>{character?.height}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CharacterScreen;

const styles = StyleSheet.create({
  section: {
    padding: 16,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  value: {
    paddingBottom: 4,
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  wrapper: {
    gap: 6,
    padding: 4,
    borderBottomWidth: 1,
    borderColor: '#c2c9d6',
  },
  descriptionContainer: {
    gap: 12,
    width: '100%',
  },
});
