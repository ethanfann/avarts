import gql from 'graphql-tag'

export default gql`
  mutation DeleteActivityComment($commentId: ID!) {
    deleteActivityComment(commentId: $commentId) {
      id
    }
  }
`
