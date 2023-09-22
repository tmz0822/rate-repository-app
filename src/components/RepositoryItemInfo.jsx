import { Linking, Pressable, View, StyleSheet, FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import theme from '../theme';
import { format, parseISO } from 'date-fns';
import { canonicalStringify } from '@apollo/client/cache';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    paddingBottom: 15,
    marginBottom: 10,
  },
  pressable: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    width: '90%',
  },
  pressableText: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 10,
    textAlign: 'center',
  },
});

const RepositoryItemInfo = ({ repository }) => {
  return (
    <>
      <RepositoryItem item={repository} />
      <View style={styles.container}>
        <Pressable
          style={styles.pressable}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text style={styles.pressableText}>Open in GitHub</Text>
        </Pressable>
      </View>
    </>
  );
};

const reviewItemStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    minHeight: 180,
    flexDirection: 'row',
    flex: 1,
  },
  ratingContainer: {
    width: '20%',
    alignItems: 'center',
    paddingTop: 10,
  },
  rating: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderRadius: 45 / 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    paddingTop: 12,
  },
  infoContainer: {
    flex: 1,
    paddingTop: 10,
  },

  username: {
    fontWeight: theme.fontWeights.bold,
  },
  text: {
    marginTop: 5,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={reviewItemStyles.container}>
      <View style={reviewItemStyles.ratingContainer}>
        <Text style={reviewItemStyles.rating}>{review.rating}</Text>
      </View>
      <View style={reviewItemStyles.infoContainer}>
        <Text style={reviewItemStyles.username}>{review.user.username}</Text>
        <Text>{format(parseISO(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={reviewItemStyles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository({
    repositoryId: id,
    first: 2,
  });

  const onEndReach = () => {
    console.log('reached end');
    fetchMore();
  };

  if (loading) return <Text>loading data..</Text>;

  return <ReviewItemList repository={repository} onEndReach={onEndReach} />;
};

const ReviewItemList = ({ repository, onEndReach }) => {
  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItemInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={1}
    />
  );
};

export default SingleRepository;
