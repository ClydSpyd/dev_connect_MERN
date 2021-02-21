import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPosts } from '../../actions/post';
import store from '../../store';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = () => {

  const post = useSelector(state => state.post)
  useEffect(()=>{ store.dispatch( getPosts()) },[])

  return post === null || (post&&post.loading) ?

    <Spinner />

  :

    <>
      <h1 className="large text-primary">Posts</h1>
      <PostForm isPost />
      <p className="lead">
        <i className="fas fa-user"></i>{' '}Welcome to the community
      </p>
      <div className="posts">
        {
          post.posts && post.posts.map(item => <PostItem key={item._id} item={item} />)
        }
      </div>

    </>
}

export default Posts
