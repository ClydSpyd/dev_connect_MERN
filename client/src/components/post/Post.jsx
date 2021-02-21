import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getPost } from '../../actions/post'
import store from '../../store'
import Spinner from '../layout/Spinner'
import CommentItem from '../posts/CommentItem'
import PostForm from '../posts/PostForm'
import PostItem from '../posts/PostItem'

const Post = () => {

  const { postId } = useParams()

  useEffect(()=>{ store.dispatch( getPost( postId ) ) },[])
  const post = useSelector(state => state.post)


  return post === null || (post&&post.loading) || (post&&!post.post) ?

    <Spinner />

  : post.post &&

    <>
      <Link className="btn" to="/posts">Back to posts</Link>
      <PostItem item={post.post} showActions={false}/> 
      {
        post.post.comments.map((comment,idx) => <CommentItem key={idx} comment={comment} postId={postId}/>)
      }
      <PostForm postId={postId}/>
    </>
  
}

export default Post
