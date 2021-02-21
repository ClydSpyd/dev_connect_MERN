const express = require('express')
const Post = require ('../../models/Post');
const User = require ('../../models/User');
const Profile = require ('../../models/Profile');
const auth = require('../../middleware/auth')
const { check, validationResult } = require("express-validator");
const router = express.Router()


// @route     GET/posts
// @desc      GET ALL POSTS
// @access    PRIVATE

router.get('/', auth, async (req,res) => {
  
  try {

    const posts = await Post.find().sort({ date: -1 })

    res.json(posts)
    
  } catch (err) {
    
    console.error(err)

    return res.status(500).send('server error')
  }

})


// @route     POST/posts
// @desc      Create a post
// @@access   private
router.post('/', [auth, [
  check('text', 'text is required').not().isEmpty()
]], async (req, res) =>  {


  const errors = validationResult(req)

  if(!errors.isEmpty()){

    return res.status(400).json({ errors: errors.array() })
  }

  try {

    const user = await User.findById(req.user.id).select('-password')
  
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    })

    const post = await newPost.save()

    res.json(post)
    
  } catch (err) {
    
    console.error(err)

    return res.status(500).send('server error')
  }


})


// @route     GET posts/:post_id
// @desc      get post by post ID
// @access   public

router.get('/:post_id', async (req, res) => {

  try {

    const post = await Post.findOne({ _id: req.params.post_id })

    if(!post){
      return res.status(400).json({ msg: 'Post not found' })
    }

   res.json(post)
    
  } catch (err) {
    
    console.error(err.message)

    if(err.kind==='ObjectId') {
      return res.status(400).json({ msg: 'Post not found' })
    }

    res.status(500).send('server error')
  }
})



// @route     DELETE /posts/:post_id
// @desc      Delete post
// @access    private
router.delete('/:post_id', auth, async(req, res) => {
  
  try {

    const post = await Post.findById(req.params.post_id)

    if(!post){
      return res.status(404).json({ msg: 'Post not found' })
    }

    //check user is owner
    if(post.user.toString() !== req.user.id){
      return res.status(401).json({ msg: "User not authorised to delete post"})
    }

    await post.remove()
    return res.json({ msg: 'Post removed'})
    
    // await Post.findOneAndRemove({ _id: req.params.post_id })
    
  } catch (err) {
   
    console.error(err.message)

    res.status(500).send('server error')
    
  }
})


// @route     PUT /posts/like/:post_id
// @desc      Like a post
// @access    private
router.put('/like/:post_id', auth, async (req, res) => {

  console.log('like')

  try {

    const post = await Post.findById(req.params.post_id)
    const user = await User.findById(req.user.id)

    if(!post){
      return res.status(404).json({ msg: 'Post not found' })
    }

    const removeIdx = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
  
    // like or unlike based on whether the user has already liked
   removeIdx ? post.likes.unshift({user: req.user.id, name: user.name }) : post.likes.splice(removeIdx, 1)    

    await post.save()

    res.json(post.likes)
    
  } catch (err) {
   
    console.error(err.message)

    res.status(500).send('server error')
    
  }
})

// @route     POST /posts/comment/:post_id
// @desc      Comment on a post
// @access    private
router.post('/comment/:post_id', [ auth, [
  check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
  
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }
  console.log(req.params.post_id)

  try {

    const post = await Post.findById(req.params.post_id)
    const user = await User.findById(req.user.id).select('-password')

    if(!post){
      return res.status(404).json({ msg: 'Post not found' })
    }


    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    }

    post.comments.unshift(newComment)

    await post.save()

    res.json(post)
    
    
  } catch (err) {
   
    console.error(err.message)

    res.status(500).send('server error')
    
  }
})


// @route     DELETE /posts/comment/:post_id/:comment_id
// @desc      Delete comment
// @access    private
router.delete('/comment/:post_id/:comment_id', auth, async(req, res) => {
  
  try {

    const post = await Post.findById(req.params.post_id)

    if(!post){
      return res.status(404).json({ msg: 'Post not found' })
    }

    // const comment = post.comments.filter(comment => comment._id.toString() === req.params.comment_id)[0]
    const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id)

    if(!comment){
      return res.status(404).json({ msg: "Comment not found"})  
    }
    
    // check user is owner 
    if(comment.user.toString() !== req.user.id){
      return res.status(401).json({ msg: "User not authorised to delete comment"})  
    } 
    
    const removeIdx = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id)

    post.comments.splice(removeIdx, 1)
    
    await post.save()

    return res.json(post)
  
  } catch (err) {
   
    console.error(err.message)

    res.status(500).send('server error')
    
  }
})




module.exports = router
