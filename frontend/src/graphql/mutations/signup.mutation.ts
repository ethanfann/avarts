import gql from 'graphql-tag'

export default gql`
  mutation signUp(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      attributes: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    ) {
      token
    }
  }
`
