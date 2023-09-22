import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  getRepositoryNodes = () => {
    const { repositories } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return repositoryNodes;
  };

  renderHeader = () => {
    const props = this.props;

    return <RepositorySearchBar setSearch={props.setSearch} />;
  };

  render() {
    return (
      <FlatList
        data={this.getRepositoryNodes()}
        ItemSeparatorComponent={ItemSeparator}
        // other props
        renderItem={({ item }) => (
          <Pressable
            onPress={() => this.props.navigate(`/repository/${item.id}`)}
          >
            <RepositoryItem item={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [search, setSearch] = useState('');
  const [searchKeyword] = useDebounce(search, 500);

  const { repositories, fetchMore } = useRepositories({
    first: 3,
    orderBy,
    orderDirection,
    searchKeyword,
  });

  const onEndReach = () => {
    console.log('on end reached');
    fetchMore();
  };

  return (
    <>
      <RepositoryOrderPicker
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
      />
      <RepositoryListContainer
        repositories={repositories}
        setSearch={setSearch}
        navigate={navigate}
        onEndReach={onEndReach}
      />
    </>
  );
};

const RepositoryOrderPicker = ({ setOrderBy, setOrderDirection }) => {
  const [selectedValue, setSelectedValue] = useState('Latest Repositories');

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);

    if (itemValue === 'Latest Repositories') {
      setOrderBy('CREATED_AT');
      setOrderDirection('DESC');
    } else if (itemValue === 'Highest rated repositories') {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('DESC');
    } else if (itemValue === 'Lowest rated repositories') {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('ASC');
    }
  };

  return (
    <View>
      <Picker selectedValue={selectedValue} onValueChange={handleValueChange}>
        <Picker.Item label='Latest repositories' value='Latest Repositories' />
        <Picker.Item
          label='Highest rated repositories'
          value='Highest rated repositories'
        />
        <Picker.Item
          label='Lowest rated repositories'
          value='Lowest rated repositories'
        />
      </Picker>
    </View>
  );
};

const RepositorySearchBar = ({ setSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearch(query);
  };

  return (
    <Searchbar
      placeholder='Search'
      onChangeText={handleSearch}
      value={searchQuery}
    />
  );
};

export default RepositoryList;
