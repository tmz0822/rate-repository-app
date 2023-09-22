import { View, StyleSheet, Pressable } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import Text from './Text';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { redirect, useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

const signUpFormStyles = StyleSheet.create({
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

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={signUpFormStyles.container}>
      <FormikTextInput
        name='username'
        placeholder='Username'
        style={signUpFormStyles.textInput}
      />
      <FormikTextInput
        name='password'
        placeholder='Password'
        style={signUpFormStyles.textInput}
        secureTextEntry
      />
      <FormikTextInput
        name='passwordConfirmation'
        placeholder='Password confirmation'
        style={signUpFormStyles.textInput}
        secureTextEntry
      />

      <Pressable style={signUpFormStyles.pressableButton} onPress={onSubmit}>
        <Text style={signUpFormStyles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Password confirmation must match with the password'
    )
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const [createUserMutation, { loading, error }] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  // contains logic
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await createUserMutation({
        variables: {
          user: {
            username,
            password,
          },
        },
      });

      // if user signs up successfully
      if (data) {
        signIn({ username, password });
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
