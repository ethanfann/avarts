import React, { useState } from 'react'
import CommentActionButton from './CommentActionButton'
import { useDeleteActivityCommentMutation } from '../../generated/graphql'
import ActivityCommentBox from './ActivityCommentBox'
import { CommentEnabledType } from '../../types/types'

type CommentType = {
  id: string
  comment: string
  userName: string
  userImg: string
}

type Props = {
  comments: Array<CommentType>
  activityId: string
  commentEnabled: CommentEnabledType | undefined
  enableComment: any
  toggleComment: any
}

const ActivityComments = (props: Props) => {
  const { comments, activityId, commentEnabled, toggleComment } = props

  const [myComments, setMyComments] = useState([...comments])
  const [deleteComment] = useDeleteActivityCommentMutation()

  const handleDeleteComment = async (
    e: React.FormEvent,
    activityCommentId: string
  ) => {
    e.preventDefault()
    try {
      await deleteComment({
        variables: {
          commentId: activityCommentId,
        },
      })
    } catch (error) {
      console.log(error)
    }

    setMyComments([
      ...myComments.filter((comment: any) => comment.id !== activityCommentId),
    ])
  }

  return (
    <>
      {myComments.map((comment: CommentType, index: number) => (
        <div key={comment.id} className="d-flex align-items-center mt-5">
          <img
            style={{
              width: '24px',
              height: '24px',
            }}
            src={
              comment.userImg !== ''
                ? comment.userImg
                : '/default-user-avatar.png'
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
          {comment.id && (
            <CommentActionButton
              activityCommentId={comment.id}
              handleDelete={handleDeleteComment}
            />
          )}
        </div>
      ))}

      <ActivityCommentBox
        hidden={
          !(commentEnabled?.enabled && activityId === commentEnabled.activityId)
        }
        activityId={activityId}
        toggleComment={toggleComment}
        myComments={myComments}
        setMyComments={setMyComments}
      />
    </>
  )
}

export default ActivityComments
