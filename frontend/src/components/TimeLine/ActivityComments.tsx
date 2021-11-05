import React from 'react'
import CommentActionButton from './CommentActionButton'

type CommentType = {
  id: string
  comment: string
  userName: string
  userImg: string
}

type Props = {
  comments: Array<CommentType>
}

const ActivityComments = (props: Props) => {
  const { comments } = props

  return (
    <>
      {comments.map((comment: CommentType, index: number) => (
        <div key={index} className="d-flex align-items-center mt-5">
          <img
            style={{
              width: '24px',
              height: '24px',
            }}
            src={
              comment.userImg !== ''
                ? comment.userImg
                : 'default-user-avatar.png'
            }
            className="rounded-circle"
            alt="user avatar"
          />
          <div className="pl-5 flex-fill">
            <span className="font-weight-bolder font-size-12">
              {comment.userName}
            </span>
            <div className="font-size-12">{comment.comment}</div>
          </div>
          {comment.id && <CommentActionButton activityCommentId={comment.id} />}
        </div>
      ))}
    </>
  )
}

export default ActivityComments
