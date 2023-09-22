import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const reviewFormStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    padding: 15,
    borderColor: theme.colors.textSecondary,
  },

  pressableButton: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    padding: 15,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },

  buttonText: {
    color: theme.colors.white,
    textAlign: 'center',
  },
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={reviewFormStyles.container}>
      <FormikTextInput
        name='ownerName'
        style={reviewFormStyles.textInput}
        placeholder='Repository Owner Name'
      />
      <FormikTextInput
        name='repositoryName'
        style={reviewFormStyles.textInput}
        placeholder='Repository Name'
      />

      <FormikTextInput
        name='rating'
        style={reviewFormStyles.textInput}
        placeholder='Rating between 0 and 100'
      />

      <FormikTextInput
        name='text'
        style={reviewFormStyles.textInput}
        placeholder='Review (optional)'
        multiline
      />

      <Pressable style={reviewFormStyles.pressableButton} onPress={onSubmit}>
        <Text style={reviewFormStyles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository Owner Name is a required field'),
  repositoryName: yup.string().required('Repository Name is a required field'),
  rating: yup
    .number()
    .min(0, 'Rating must be between 0 - 100')
    .max(100, 'Rating must be between 0 - 100')
    .required('Rating is a required field'),
  text: yup.string().optional(),
});

const ReviewContainer = ({ onSubmit }) => {
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, errors }) => (
        <ReviewForm onSubmit={handleSubmit} errors={errors} />
      )}
    </Formik>
  );
};

const CreateReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: parseInt(rating),
            text,
          },
        },
      });

      navigate(`/repository/${data.createReview.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
