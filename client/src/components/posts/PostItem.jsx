import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import store from '../../store'
import { deletePost, likePost } from '../../actions/post'

const PostItem = ({ item: { _id, text, name, avatar, user, likes, comments, date }, showActions = true }) => {

  const auth = useSelector(state => state.auth)

  const checkLikes = (likes, userId) => {
    return likes.some( like => like.user === userId)
  }

  return _id && auth.user && (
    <>
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              class="round-img"
              src={avatar}
              alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1">
            {text}
          </p>
          <p class="post-date">Posted on <Moment format='YYYY/MM/DD'>{date}</Moment> </p>

        {
          showActions &&
            <>
              <button onClick={()=> store.dispatch( likePost(_id) ) } className={checkLikes(likes, auth.user._id) ? "btn btn-like" : "btn btn-light"}>

                  <>
                    <i className="fas fa-thumbs-up" />
                    {likes.length > 0 && <span>{' '}{likes.length}</span>}
                  </>

              </button>

              <Link className="btn btn-primary" to={`/post/${_id}`}>
                Discussion {comments.length>0 && <span className="comment-count">{comments.length}</span>}
              </Link>

              {

              }
              {user === auth.user._id &&
                <button
                onClick={()=> store.dispatch( deletePost(_id) ) }
                  type="button"
                  class="btn btn-danger" >
                  <i class="fas fa-times"></i>
                </button>
              }
            </>
        }
        </div>
      </div>
    </>
  )
}

export default PostItem
