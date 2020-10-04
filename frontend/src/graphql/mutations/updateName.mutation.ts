import gql from 'graphql-tag'

export default gql`
  mutation updateUserName($firstName: String!, $lastName: String!) {
    updateName(firstName: $firstName, lastName: $lastName) {
      name
    }
  }
`
