import gql from 'graphql-tag'

export default gql`
  mutation DeleteActivity($activityId: ID!) {
    deleteActivity(activityId: $activityId) {
      id
    }
  }
`
