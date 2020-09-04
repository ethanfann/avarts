import gql from 'graphql-tag'

export default gql`
  mutation uploadActivity(
    $title: String!
    $description: String!
    $geoJson: JSON!
    $userId: ID!
  ) {
    upload(
      title: $title
      description: $description
      geoJson: $geoJson
      userId: $userId
    ) {
      id
    }
  }
`
