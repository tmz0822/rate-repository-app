import { useMutation, useQuery } from '@apollo/client';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { GET_CURRENT_USER } from '../graphql/queries';
import theme from '../theme';
import Text from './Text';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';
import { canonicalStringify } from '@apollo/client/cache';

const reviewItemStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flexDirection: 'column',
    minHeight: 100,
    paddingBottom: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
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

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-evenly',
  },

  viewButton: {
    width: 150,
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
  },

  deleteButton: {
    width: 150,
    backgroundColor: theme.colors.error,
    paddingVertical: 8,
  },

  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
  },
});

const UserReviewItem = ({ review, refetch }) => {
  const [deleteReviewMutation] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  const deleteReview = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            try {
              deleteReviewMutation({
                variables: {
                  deleteReviewId: review.id,
                },
              });
              refetch();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={reviewItemStyles.container}>
      <View style={reviewItemStyles.reviewContainer}>
        <View style={reviewItemStyles.ratingContainer}>
          <Text style={reviewItemStyles.rating}>{review.rating}</Text>
        </View>
        <View style={reviewItemStyles.infoContainer}>
          <Text style={reviewItemStyles.username}>
            {review.repository.fullName}
          </Text>
          <Text>{format(parseISO(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text style={reviewItemStyles.text}>{review.text}</Text>
        </View>
      </View>

      <View style={reviewItemStyles.buttonContainer}>
        <Pressable
          style={reviewItemStyles.viewButton}
          onPress={() => navigate(`/repository/${review.repository.id}`)}
        >
          <Text style={reviewItemStyles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable style={reviewItemStyles.deleteButton} onPress={deleteReview}>
          <Text style={reviewItemStyles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={{ height: 10 }} />;

const UserReviewList = () => {
  const { data, refetch } = useQuery(GET_CURRENT_USER, {
    variables: {
      includeReviews: true,
    },
  });

  const reviews = data ? data.me.reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <UserReviewItem review={item} refetch={refetch} />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReviewList;
