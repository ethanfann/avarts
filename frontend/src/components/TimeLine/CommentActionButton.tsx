import { faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDeleteActivityCommentMutation } from '../../generated/graphql'

type Props = {
  activityCommentId: string
}

const CommentActionButton = (props: Props) => {
  const { activityCommentId } = props
  const [deleteComment] = useDeleteActivityCommentMutation()

  const handleDeleteComment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await deleteComment({
        variables: {
          commentId: activityCommentId,
        },
        refetchQueries: ['myActivities'],
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="dropdown dropleft with-arrow">
        <button
          className="float-right btn btn-sm mb-0 pb-0"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <FontAwesomeIcon size="1x" icon={faEllipsisV} />
        </button>
        <div
          className="dropdown-menu dropdown-menu-center"
          aria-labelledby="..."
          style={{ minWidth: '0px' }}
        >
          <div style={{ maxWidth: '50px' }} className="text-center">
            <button
              className="btn btn-danger btn-sm"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => handleDeleteComment(e)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentActionButton
