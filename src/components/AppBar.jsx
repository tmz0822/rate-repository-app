import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useApolloClient, useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import Text from './Text';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  scrollView: {
    paddingTop: 30,
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  let currentUser;
  const result = useQuery(CURRENT_USER);
  const navigate = useNavigate();

  if (result.loading) {
    console.log('loading CURRENT_USER query');
    return <Text>loading user...</Text>;
  } else {
    currentUser = result.data.me;
  }

  const handleLogout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();

    // redirect user to signin page
    navigate('/signin');
  };

  console.log(currentUser);

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab to='/' label='Repositories' />

        {!currentUser ? (
          <AppBarTab to='/signin' label='Sign in' />
        ) : (
          <AppBarTab label='Sign out' onPress={handleLogout} />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
