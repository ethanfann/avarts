import gql from 'graphql-tag'

export default gql`
  query activitiesByUserId($userId: ID!) {
    activitiesByUserId(userId: $userId) {
      id
      title
      description
      geoJson
      createdAt
      user {
        name
        img
      }
      comments {
        id
        comment
        user {
          name
          img
        }
      }
    }
  }
`
