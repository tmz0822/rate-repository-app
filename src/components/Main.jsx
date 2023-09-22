import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import { View, StyleSheet } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import theme from '../theme';
import SignIn from './SignIn';
import RepositoryItemInfo from './RepositoryItemInfo';
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';
import UserReview from './UserReview';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flex: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/repository/:id' element={<RepositoryItemInfo />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/review' element={<ReviewForm />} />
        <Route path='/myreview' element={<UserReview />} />
        <Route path='/signup' element={<SignUpForm />} />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
