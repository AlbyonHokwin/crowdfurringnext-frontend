import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import React from 'react';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { BACKEND_URL } from "../global";

const SearchInput = ({ updateDisplayPots }) => {
  const [search, setSearch] = useState('');
  const [searchInfoVisible, setSearchInfoVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    setSearch('');
  }, [isFocused])

  const doSearch = async value => {
    if (!value) {
      updateDisplayPots([]);
      return;
    }

    setIsLoading(true);
    const response = await fetch(`${BACKEND_URL}/pots/search/${value.trim()}`);
    const data = await response.json();
    setIsLoading(false);

    if (data.result) {
      updateDisplayPots(data.pots);
    } else {
      setSearchInfoVisible(true);
      setTimeout(() => setSearchInfoVisible(false), 3000);
      updateDisplayPots([]);
      setSearch('');
    }
  }

  return (
    <>
      <View style={styles.container}>
        <FontAwesome name="search" size={30} color={colors.shade} />
        <TextInput
          placeholder='Recherche...'
          textContentType='name'
          style={styles.input}
          onChangeText={value => setSearch(value)}
          onEndEditing={e => doSearch(e.nativeEvent.text)}
          value={search}
        />
      </View>

      {searchInfoVisible &&
        <View style={styles.searchInfoContainer}>
          <Text style={styles.searchInfo}>
            Aucune cagnotte n'a été trouvé !
          </Text>
          {/* <View style={styles.divider} />
          <Text style={styles.searchInfo}>
            Affichages de toutes les cagnottes en cours
          </Text>
          <ActivityIndicator
            style={{ margin: 10 }}
            size="small"
            color={colors.primary}
          /> */}
        </View>}

      {isLoading &&
        <View style={styles.searchInfoContainer}>
          <Text style={{ ...fonts.base.normal }}>
            Recherche en cours
          </Text>
          <Text style={{ ...fonts.base.bold }}>
            Merci de bien vouloir patienter
          </Text>
          <ActivityIndicator
            style={{ margin: 10 }}
            size="small"
            color={colors.primary}
          />
        </View>}
    </>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '80%',
    maxWidth: '80%',
    backgroundColor: colors.light,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.shade,
  },
  input: {
    marginLeft: 10,
    flexGrow: 1,
    fontSize: 20,
    color: colors.dark,
  },
  searchInfoContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 60,
    width: '80%',
    backgroundColor: colors.light,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.shade,
    zIndex: 1000,
  },
  searchInfo: {
    fontSize: 20,
    color: 'red',
  },
  divider: {
    minWidth: '90%',
    maxWidth: '90%',
    borderBottomWidth: 1,
    borderColor: colors.accent,
    marginVertical: 10,
  },
});