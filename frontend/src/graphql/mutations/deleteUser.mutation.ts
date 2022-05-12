import gql from 'graphql-tag'

export default gql`
  mutation DeleteUser {
    deleteUser {
      id
    }
  }
`
