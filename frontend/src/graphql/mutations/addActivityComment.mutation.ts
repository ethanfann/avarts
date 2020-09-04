import gql from 'graphql-tag'

export default gql`
  mutation AddActivityComment(
    $comment: String!
    $userId: ID!
    $activityId: ID!
  ) {
    addActivityComment(
      comment: $comment
      userId: $userId
      activityId: $activityId
    ) {
      id
    }
  }
`
