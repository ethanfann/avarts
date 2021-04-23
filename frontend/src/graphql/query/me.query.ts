import gql from 'graphql-tag'

export default gql`
  query me {
    me {
      id
      name
      email
      img
      latestActivity {
        title
        createdAt
        startTime
      }
      activityCount
      firstName
      lastName
    }
  }
`
