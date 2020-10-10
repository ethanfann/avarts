import gql from 'graphql-tag'

export default gql`
  mutation uploadActivity(
    $title: String!
    $description: String!
    $fitFile: Upload!
    $userId: ID!
  ) {
    upload(
      title: $title
      description: $description
      fitFile: $fitFile
      userId: $userId
    ) {
      id
    }
  }
`
