import React from 'react'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/post'
import  store  from '../../store';

const CommentItem = ({ comment, postId }) => {

  const auth = useSelector(state => state.auth)

  return comment && auth && auth.user && (
    <>
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${comment.user}`}>
            <img
              class="round-img"
              src={comment.avatar}
              alt=""
            />
            <h4>{comment.name}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1"> {comment.text} </p>

            <p class="post-date">Posted on <Moment format='YYYY/MM/DD'>{comment.date}</Moment> </p>
            {comment.user === auth.user._id &&
              <button
                onClick={() => store.dispatch(deleteComment(postId, comment._id))}
                type="button"
                class="btn btn-danger" >
                <i class="fas fa-times"></i>
              </button>
            }
        </div>
      </div>
    </>
  )
}

export default CommentItem
