import gql from 'graphql-tag'

export default gql`
  query monthlyActivity {
    monthlyActivity {
      distance
      createdAt
      startTime
      title
      id
    }
  }
`
