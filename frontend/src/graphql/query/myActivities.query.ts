import gql from 'graphql-tag'

export default gql`
  query myActivities($limit: Int, $offset: Int) {
    myActivities(limit: $limit, offset: $offset) {
      id
      title
      description
      polyline
      startTime
      duration
      elevation
      distance
      createdAt
      updatedAt
      user {
        id
        name
        img
        strokeColor
        token
      }
      activityComment {
        id
        comment
        createdAt
        updatedAt
        user {
          name
          img
          createdAt
          updatedAt
          firstName
          lastName
        }
      }
    }
  }
`
