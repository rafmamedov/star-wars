import React, {useMemo, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SearchIcon} from '../../../icons/SearchIcon';
import {AnimatedIcon} from '../../../components/AnimatedIcon';
import {ChevronIcon} from '../../../icons/ChevronIcon';
import {FilledHeartIcon} from '../../../icons/FilledHeartIcon';
import {HeartIcon} from '../../../icons/HeartIcon';
import {Character, paginationOrder} from '../../../types/types';

type Props = {
  loading: boolean;
  totalCount: number;
  currentPage: number;
  characters: Character[];
  onPaginate: (order: paginationOrder) => void;
  checkIsAdded: (character: Character) => boolean;
  handleAddCharacter: (character: Character) => void;
};

export const ListSection: React.FC<Props> = ({
  loading,
  characters,
  totalCount,
  onPaginate,
  currentPage,
  checkIsAdded,
  handleAddCharacter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const navigation = useNavigation();

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === Math.ceil(totalCount / 10);

  const filteredList = useMemo(
    () =>
      characters.filter(character =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, characters],
  );

  const sortedList = useMemo(() => {
    let sortedCharacters = [...filteredList];

    if (sortOrder === 0) {
      sortedCharacters.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }

    if (sortOrder === 1) {
      sortedCharacters.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    }

    return sortedCharacters;
  }, [filteredList, sortOrder]);

  const onNavigate = (url: string, name: string) => {
    navigation.navigate('CharacterScreen', {url, name});
  };

  const handleChangeSortOrder = () => {
    if (sortOrder === 0) {
      setSortOrder(1);
    } else {
      setSortOrder(0);
    }
  };

  const listHeader = (
    <View style={[styles.row, styles.header]}>
      <View style={[styles.cell, styles.headerCell, styles.buttonCell]}>
        <FilledHeartIcon fill="black" size={20} />
      </View>

      <View style={[styles.cell, styles.headerCell, styles.biggerCell]}>
        <TouchableOpacity
          style={styles.nameCell}
          onPress={handleChangeSortOrder}>
          <Text style={styles.label}>Name</Text>
          <AnimatedIcon pressed={sortOrder === 0} />
        </TouchableOpacity>
      </View>

      <View style={[styles.cell, styles.headerCell, styles.smallerCell]}>
        <Text style={styles.label}>Birth year</Text>
      </View>

      <View style={[styles.cell, styles.headerCell, styles.smallerCell]}>
        <Text style={styles.label}>Gender</Text>
      </View>

      <View style={[styles.cell, styles.headerCell, styles.biggerCell]}>
        <Text style={styles.label}>Home world</Text>
      </View>

      <View style={[styles.cell, styles.smallerCell]}>
        <Text style={styles.label}>Species</Text>
      </View>
    </View>
  );

  const listFooter = (
    <View style={styles.footer}>
      <Text style={styles.label}>{`${(currentPage - 1) * 10 + 1}–${Math.min(
        currentPage * 10,
        totalCount,
      )} of ${totalCount}`}</Text>

      <View style={styles.footerButtons}>
        <TouchableOpacity
          disabled={isPrevDisabled}
          onPress={() => onPaginate('previous')}>
          <ChevronIcon left disabled={isPrevDisabled} />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isNextDisabled}
          onPress={() => onPaginate('next')}>
          <ChevronIcon disabled={isNextDisabled} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem: ListRenderItem<Character> = ({item}) => (
    <Pressable onPress={() => onNavigate(item.url, item.name)}>
      <View style={styles.row}>
        <View style={[styles.cell, styles.buttonCell]}>
          <TouchableOpacity onPress={() => handleAddCharacter(item)}>
            {checkIsAdded(item) ? (
              <FilledHeartIcon fill="red" size={20} />
            ) : (
              <HeartIcon />
            )}
          </TouchableOpacity>
        </View>

        <View style={[styles.cell, styles.biggerCell]}>
          <Text style={styles.label}>{item.name}</Text>
        </View>

        <View style={[styles.cell, styles.smallerCell]}>
          <Text style={styles.label}>{item.birth_year}</Text>
        </View>

        <View style={[styles.cell, styles.smallerCell]}>
          <Text style={styles.label}>{item.gender}</Text>
        </View>

        <View style={[styles.cell, styles.biggerCell]}>
          <Text style={styles.label}>{item.homeworld}</Text>
        </View>

        <View style={[styles.cell, styles.smallerCell]}>
          <Text style={styles.label}>{item.species}</Text>
        </View>
      </View>
    </Pressable>
  );

  const listEmptyComponent = () => (
    <View style={styles.emptyComponent}>
      <Text style={styles.label}>No characters found</Text>
    </View>
  );

  return (
    <View style={styles.listWrapper}>
      <View style={styles.inputWrapper}>
        <SearchIcon />
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="on-drag">
        {loading ? (
          <Text style={styles.label}>loading...</Text>
        ) : (
          <FlatList
            data={sortedList}
            renderItem={renderItem}
            alwaysBounceVertical={false}
            keyExtractor={item => item.name}
            ListFooterComponent={listFooter}
            ListHeaderComponent={listHeader}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
            ListEmptyComponent={listEmptyComponent}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    gap: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    fontSize: 16,
    color: '#000',
    width: '100%',
  },
  listWrapper: {
    flex: 1,
    gap: 10,
    padding: 14,
    borderRadius: 8,
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  content: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#c2c9d6',
    backgroundColor: '#fff',
  },
  label: {
    color: '#000',
  },
  row: {
    padding: 4,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#c2c9d6',
  },
  header: {
    paddingVertical: 10,
  },
  headerCell: {
    borderRightWidth: 1,
    borderRightColor: '#c2c9d6',
  },
  cell: {
    flex: 0,
    paddingVertical: 4,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  nameCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  biggerCell: {
    width: 150,
  },
  smallerCell: {
    width: 120,
  },
  buttonCell: {
    width: 50,
  },
  emptyComponent: {
    paddingTop: 16,
    paddingLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 8,
    gap: 16,
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
