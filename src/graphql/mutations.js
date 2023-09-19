import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signIn($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
