import gql from 'graphql-tag'

export default gql`
  query activityById($id: ID!) {
    activityById(id: $id) {
      id
      title
      description
      polyline
      startTime
      duration
      elevation
      distance
      createdAt
      user {
        name
        img
      }
    }
  }
`
