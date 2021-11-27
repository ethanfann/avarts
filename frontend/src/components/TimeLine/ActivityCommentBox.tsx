import React, { useEffect, useState } from 'react'
import { useAddActivityCommentMutation } from '../../generated/graphql'
import UserContext, { UserType } from '../../userContext'

type Props = {
  activityId: string | undefined
  hidden: boolean | undefined | null
  toggleComment: any
  myComments: any
  setMyComments: any
}

export const ActivityCommentBox = (props: Props) => {
  const { activityId, hidden, toggleComment, myComments, setMyComments } = props
  const [comment, setComment] = useState('')
  const [addActivityCommentMutation] = useAddActivityCommentMutation()

  let commentBox: HTMLInputElement | null

  useEffect(() => {
    commentBox?.focus()
  })

  useEffect(() => {
    const commentButton = document.getElementById('commentButton')

    if (comment.length === 0) {
      commentButton?.classList.add('disabled')
    } else {
      commentButton?.classList.remove('disabled')
    }
  })

  const disableInput = () => {
    return comment.length === 0
  }

  const addComment = async (e: React.FormEvent, currentUser: UserType) => {
    e.preventDefault()
    if (currentUser && currentUser.id && activityId) {
      const results = await addActivityCommentMutation({
        variables: {
          comment: comment,
          userId: currentUser.id,
          activityId: activityId,
        },
      })

      if (results && results.data && results.data.addActivityComment) {
        setMyComments([
          ...myComments,
          {
            id: results.data.addActivityComment.id,
            comment: comment,
            userName: currentUser.name,
            userImg: currentUser.img,
          },
        ])
      }
    }

    setComment('')
    toggleComment({
      activityId: activityId,
      enabled: false,
    })
  }

  return (
    <UserContext.Consumer>
      {(ctx) => (
        <div
          style={{ visibility: hidden ? 'hidden' : 'visible' }}
          className="mt-5 mb-5"
        >
          <form
            onSubmit={(e) => addComment(e, ctx.user)}
            className="form-inline"
          >
            <input
              ref={(selected) => {
                commentBox = selected
              }}
              className="form-control"
              placeholder="Enter comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              autoFocus
            />
            <input
              type="submit"
              className="btn btn-primary btn-sm"
              value="Submit"
              disabled={disableInput()}
            />
          </form>
        </div>
      )}
    </UserContext.Consumer>
  )
}

export default ActivityCommentBox
