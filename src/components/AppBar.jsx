import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab to='/' label='Repositories' />
        <AppBarTab to='/signin' label='Sign in' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
