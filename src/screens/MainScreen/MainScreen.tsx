import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getFans, getDetails} from '../../api/api';
import {Character, paginationOrder} from '../../types/types';
import {CounterSection} from './components/CounterSection';
import {ListSection} from './components/ListSection';

const MainScreen = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [maleCounter, setMaleCounter] = useState<Character[]>([]);
  const [femaleCounter, setFemaleCounter] = useState<Character[]>([]);
  const [othersCounter, setOthersCounter] = useState<Character[]>([]);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    height: '100%',
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const clearCounter = () => {
    setMaleCounter([]);
    setFemaleCounter([]);
    setOthersCounter([]);
  };

  const handleAddCharacter = (fan: Character) => {
    switch (fan.gender) {
      case 'male':
        if (maleCounter.some(male => male.name === fan.name)) {
          setMaleCounter(current =>
            current.filter(male => male.name !== fan.name),
          );
        } else {
          setMaleCounter(current => [...current, fan]);
        }
        break;

      case 'female':
        if (femaleCounter.some(female => female.name === fan.name)) {
          setFemaleCounter(current =>
            current.filter(female => female.name !== fan.name),
          );
        } else {
          setFemaleCounter(current => [...current, fan]);
        }
        break;

      default:
        if (othersCounter.some(they => they.name === fan.name)) {
          setOthersCounter(current =>
            current.filter(they => they.name !== fan.name),
          );
        } else {
          setOthersCounter(current => [...current, fan]);
        }
        break;
    }
  };

  const checkIsAdded = (fan: Character) => {
    if (fan.gender === 'female') {
      return femaleCounter.some(female => female.name === fan.name);
    }

    if (fan.gender === 'male') {
      return maleCounter.some(male => male.name === fan.name);
    }

    return othersCounter.some(they => they.name === fan.name);
  };

  const getCharactersFromServer = async (page: number) => {
    setLoading(true);
    try {
      const fetchedCharacters = await getFans(page);
      setTotalCount(fetchedCharacters.count);
      setTotalPages(Math.ceil(fetchedCharacters.count / 10));

      const charactersPromises = fetchedCharacters.results.map(
        async (character: Character) => {
          try {
            const homePlanet = await getDetails(character.homeworld);
            const fetchedSpecies =
              character.species.length > 0
                ? await getDetails(character.species[0])
                : {name: ''};

            return {
              ...character,
              species: fetchedSpecies?.name,
              homeworld: homePlanet.name,
            };
          } catch (error) {
            console.error('Error fetching homeworld details:', error);
            return character;
          }
        },
      );

      const formattedCharactersData = await Promise.all(charactersPromises);

      setCharacters(formattedCharactersData);
    } catch (error) {
      console.error('Error fetching fans:', error);
    } finally {
      setLoading(false);
    }
  };

  const onPaginate = (order: paginationOrder) => {
    switch (order) {
      case 'next':
        if (currentPage < totalPages) {
          setCurrentPage(current => current + 1);
          getCharactersFromServer(currentPage + 1);
        }
        break;

      case 'previous':
        if (currentPage > 1) {
          setCurrentPage(current => current - 1);
          getCharactersFromServer(currentPage - 1);
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    getCharactersFromServer(1);
  }, []);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.section}>
        <CounterSection
          clearCounter={clearCounter}
          femaleCounter={femaleCounter}
          maleCounter={maleCounter}
          othersCounter={othersCounter}
        />

        <ListSection
          loading={loading}
          characters={characters}
          onPaginate={onPaginate}
          totalCount={totalCount}
          currentPage={currentPage}
          checkIsAdded={checkIsAdded}
          handleAddCharacter={handleAddCharacter}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  section: {
    gap: 20,
    padding: 16,
    height: '100%',
    backgroundColor: Colors.lighter,
  },
});
