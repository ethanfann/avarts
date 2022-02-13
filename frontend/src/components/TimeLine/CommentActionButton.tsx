import { faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
  activityCommentId: string
  handleDelete: any
}

const CommentActionButton = (props: Props) => {
  const { activityCommentId, handleDelete } = props

  return (
    <>
      <div className="dropdown dropleft with-arrow">
        <button
          className="float-right btn btn-sm mb-0 pb-0"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          aria-label="more actions button"
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
              onClick={(e) => handleDelete(e, activityCommentId)}
              aria-label={'comment delete button'}
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
