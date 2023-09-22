import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';

const cardHeaderStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15,
    flex: 1,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    marginTop: 3,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 3,
    padding: 4,
  },
  language: {
    color: '#fff',
  },
  pressableText: {
    textAlign: 'center',
  },
});

const CardHeader = ({ item }) => {
  return (
    <View style={cardHeaderStyles.container}>
      <Image
        style={cardHeaderStyles.avatar}
        source={{
          uri: item.ownerAvatarUrl,
        }}
      ></Image>

      <View style={cardHeaderStyles.infoContainer}>
        <Text fontWeight='bold' fontSize='subheading'>
          {item.fullName}
        </Text>
        <Text>{item.description}</Text>
        <View style={cardHeaderStyles.languageContainer}>
          <Text style={cardHeaderStyles.language}>{item.language}</Text>
        </View>
      </View>
    </View>
  );
};

const cardFooterStyles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 5,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
});

const CardFooter = ({ item }) => {
  return (
    <View style={cardFooterStyles.container}>
      <View style={cardFooterStyles.infoContainer}>
        <Text fontWeight='bold' style={cardFooterStyles.text}>
          {item.stargazersCount > 1000
            ? (item.stargazersCount / 1000).toFixed(1) + 'k'
            : item.stargazersCount}
        </Text>
        <Text fontWeight='bold' style={cardFooterStyles.text}>
          {item.forksCount > 1000
            ? (item.forksCount / 1000).toFixed(1) + 'k'
            : item.forksCount}
        </Text>
        <Text fontWeight='bold' style={cardFooterStyles.text}>
          {item.reviewCount > 1000
            ? (item.reviewCount / 1000).toFixed(1) + 'k'
            : item.reviewCount}
        </Text>
        <Text fontWeight='bold' style={cardFooterStyles.text}>
          {item.ratingAverage > 1000
            ? (item.ratingAverage / 1000).toFixed(1) + 'k'
            : item.ratingAverage}
        </Text>
      </View>
      <View style={cardFooterStyles.infoContainer}>
        <Text style={cardFooterStyles.text}>Stars</Text>
        <Text style={cardFooterStyles.text}>Forks</Text>
        <Text style={cardFooterStyles.text}>Reviews</Text>
        <Text style={cardFooterStyles.text}>Rating</Text>
      </View>
    </View>
  );
};

const itemStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    minHeight: 150,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View testID='repositoryItem' style={itemStyle.container}>
      <CardHeader testID='cardHeader' item={item} />
      <CardFooter testID='cardFooter' item={item} />
    </View>
  );
};

export default RepositoryItem;
