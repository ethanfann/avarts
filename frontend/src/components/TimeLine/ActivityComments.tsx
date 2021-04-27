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

export const ActivityComments = (props: Props) => {
  const { comments } = props

  return (
    <>
      {comments.map((comment: CommentType, index: number) => (
        <div key={index} className="row align-items-center mt-5">
          <div className="col-1">
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
              alt="responsive image"
            />
          </div>
          <div className="col-10">
            <div className="pr-5">
              <span className="font-weight-bolder font-size-12">
                {comment.userName}
              </span>
              <div className="font-size-12">{comment.comment}</div>
            </div>
          </div>
          <div className="col-1 h-full m-0 p-0">
            {comment.id && (
              <CommentActionButton activityCommentId={comment.id} />
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export default ActivityComments
