import { Pressable, StyleSheet, Text } from 'react-native';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  text: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: '#ffffff',
    paddingRight: 10,
  },
});

const AppBarTab = ({ label, to }) => {
  return (
    <Pressable>
      <Link to={to}>
        <Text style={styles.text}>{label}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
