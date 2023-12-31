import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';

import theme from '../theme';
import Text from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
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

  errorTextInput: {
    borderColor: theme.colors.error,
  },

  buttonContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    padding: 15,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },

  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    textAlign: 'center',
  },
});

const initialValues = {
  username: '',
  password: '',
};

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name='username'
        style={styles.textInput}
        placeholder='Username'
      />

      <FormikTextInput
        name='password'
        style={styles.textInput}
        placeholder='Password'
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback onPress={onSubmit}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn(); // side effect
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });

      // if user successfully login
      if (data) {
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

// "Pure" code (Extract pure code into another component for testing)
export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
