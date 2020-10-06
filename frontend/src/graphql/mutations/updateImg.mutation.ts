import gql from 'graphql-tag'

export default gql`
  mutation updateUserImg($img: Upload!) {
    updateImg(img: $img) {
      img
    }
  }
`
