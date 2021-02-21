import React, { useState } from 'react';
import { addPost, makeComment } from '../../actions/post';
import store from '../../store';

const PostForm = ({ isPost, postId }) => {

  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    isPost ? store.dispatch( addPost({text:text})) :store.dispatch( makeComment(postId, {text:text}))

  }

  return (
    <div className="post-form">
      {isPost &&
          <div className="bg-primary p">
            <h3>Say Something...</h3>
          </div>
      }
      <form className="form my-1" onSubmit={(e)=> handleSubmit(e) }>
        <textarea
          onChange={(e)=> setText(e.target.value)}
          name="text"
          cols="30"
          rows="5"
          placeholder={isPost?"Create a post":"Leave a comment"}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  )
}

export default PostForm
