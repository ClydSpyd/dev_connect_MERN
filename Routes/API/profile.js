const express = require('express')
const router = express.Router()
const Profile = require ('../../models/Profile');
const Post = require ('../../models/Post');
const auth = require('../../middleware/auth')
const { check, validationResult } = require("express-validator");
const request = require('request')
const config = require('config')

// @route     GET/profile/me
// @desc      get curent user profile
// @@access   private
router.get('/me', auth, async (req,res) => {
  
  try {

    const profile = await (await Profile.findOne({user: req.user.id}).populate('user', [ 'name', 'avatar']))

    if(!profile){
      return res.status(400).json({
        msg: 'No profile found for this user'
      })
    }

    res.json(profile)
    
  } catch (err) {
   
    console.error(err.message)

    res.status(500).send('server error')
  }

})


// @route     POST/profile
// @desc      create or update user profile
// @@access   private

router.post('/', [auth, [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Please enter at least 1 skill').not().isEmpty()
]], async (req, res) => {

  const errors = validationResult(req)

  if(!errors.isEmpty()){

    return res.status(400).json({ errors: errors.array() })
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
    dogPreference
  } = req.body

  console.log(skills)

  // build profile object
  const profileFields = {}
  
  profileFields.user = req.user.id
  if(company)profileFields.company=company
  if(website)profileFields.website=website
  if(location)profileFields.location=location
  if(bio)profileFields.bio=bio
  if(status)profileFields.status=status
  if(githubusername)profileFields.githubusername=githubusername
  if(dogPreference)profileFields.dogPreference=dogPreference
  if(skills){
    profileFields.skills =  typeof skills === 'string' ? skills.split(',').map(skill => skill.trim()) : skills
  }

  profileFields.social = {}
  if(youtube)profileFields.social.youtube=youtube
  if(facebook)profileFields.social.facebook=facebook
  if(twitter)profileFields.social.twitter=twitter
  if(instagram)profileFields.social.instagram=instagram
  if(linkedin)profileFields.social.linkedin=linkedin

  try {

    let profile = await Profile.findOne({ user: req.user.id })

    if(profile){
      //update
      profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })

      return res.json(profile)
    }

    //create

    profile = new Profile(profileFields)

    await profile.save()

    res.json(profile)
    
  } catch (err) {
    
    console.error(err)

    return res.status(500).send('server error')
  }

})



// @route     GET/profile
// @desc      get all profiles
// @@access   public

router.get('/', async (req, res) => {

  try {

    const profiles = await Profile.find().populate('user', [ 'name', 'avatar'])

   res.json(profiles)
    
  } catch (err) {
    
    console.error(err.message)

   res.status(500).send('server error')
  }
})


// @route     GET/profile/user/:user_id
// @desc      get profile by user ID
// @@access   public

router.get('/user/:user_id', async (req, res) => {

  try {

    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [ 'name', 'avatar'])

    if(!profile){
      return res.status(400).json({ msg: 'Profile not found' })
    }

   res.json(profile)
    
  } catch (err) {
    
    console.error(err.message)

    if(err.kind==='ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' })
    }

   res.status(500).send('server error')
  }
})


// @route     DELETE /profile
// @desc      Delete profile, user and posts
// @access   private

router.delete('/', auth, async (req,res) => {
  
  try {
    // remove user posts
    await Post.deleteMany({ user: req.user.id })

    // remove user & profile
    await Profile.findOneAndRemove({ user: req.user.id })
    await User.findOneAndRemove({ _id: req.user.id })

    return res.json({ msg: 'user removed'})
    
  } catch (err) {
   
    console.error(err.message)

    res.status(500).send('server error')
  }

})


// @route     PUT /profile/experience
// @desc      Add experience to profile
// @access    private

router.put('/experience', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'Start date is required').not().isEmpty(),
]], async (req, res) => {

  const errors = validationResult(req)

  if(!errors.isEmpty()){

    return res.status(400).json({ errors: errors.array() })
  }

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body

  // build experience object
  const newExp = {title, company, location, from, to, current, description}
  
  try {

    const profile = await Profile.findOne({ user: req.user.id })
    profile.experience.unshift(newExp)
    await profile.save()

    return res.json(profile)

  } catch (err) {
    
    console.error(err)

    return res.status(500).send('server error')
  }

})

// @route     DELETE /profile/experience/:exp_id
// @desc      Delete experience from profile
// @access    private

router.delete('/experience/:exp_id', auth, async (req, res) => {

  try {

   
    const profile = await Profile.findOne({ user: req.user.id })

    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

    profile.experience.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
    
  } catch (err) {
   
    console.error(err)

    return res.status(500).send('server error') 

  }

})

// @route     PUT /profile/experience/:exp_id
// @desc      Edit experience
// @access    private

router.put('/experience/edit/:exp_id', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'Start date is required').not().isEmpty(),
]], async (req, res) => {

  const errors = validationResult(req)

  if(!errors.isEmpty()){

    return res.status(400).json({ errors: errors.array() })
  }

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body


  // build experience object
  const expObj = {title, company, location, from, to, current, description}

  try {

   
    let profile = await Profile.findOne({ user: req.user.id })

    const expIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

    profile.experience[expIndex] = expObj

    await profile.save()

    res.json(profile)
    
  } catch (err) {
   
    console.error(err)

    return res.status(500).send('server error') 

  }

})


// @route     PUT /profile/education
// @desc      Add education to profile
// @access    private

router.put('/education', [auth, [
  check('school', 'School is required').not().isEmpty(),
  check('levelOfStudy', 'Level of study is required').not().isEmpty(),
  check('fieldOfStudy', 'Field of study  is required').not().isEmpty(),
  check('from', 'Start date is required').not().isEmpty(),
]], async (req, res) => {

  const errors = validationResult(req)

  if(!errors.isEmpty()){

    return res.status(400).json({ errors: errors.array() })
  }

  const {
    school,
    levelOfStudy,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = req.body

  // build education object
  const newEdu = {school, levelOfStudy, fieldOfStudy, from, to, current, description}
  
  try {

    const profile = await Profile.findOne({ user: req.user.id })
    profile.education.unshift(newEdu)
    await profile.save()

    return res.json(profile)

  } catch (err) {
    
    console.error(err)

    return res.status(500).send('server error')
  }

})


// @route     DELETE /profile/education/:edu_id
// @desc      Delete education from profile
// @access    private

router.delete('/education/:edu_id', auth, async (req, res) => {

  try {

   
    const profile = await Profile.findOne({ user: req.user.id })

    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

    profile.education.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
    
  } catch (err) {
   
    console.error(err)

    return res.status(500).send('server error') 

  }

})

// @route     PUT /profile/education/:edu_id
// @desc      Edit education
// @access    private
router.put('/education/edit/:edu_id', [auth, [
  check('school', 'School is required').not().isEmpty(),
  check('levelOfStudy', 'Level of study is required').not().isEmpty(),
  check('fieldOfStudy', 'Field of study  is required').not().isEmpty(),
  check('from', 'Start date is required').not().isEmpty(),
]], async (req, res) => {

  const errors = validationResult(req)

  if(!errors.isEmpty()){

    return res.status(400).json({ errors: errors.array() })
  }

  const {
    school,
    levelOfStudy,
    fieldOfStudy,
    from,
    to,
    current,
    description
  } = req.body

  // build education object
  const eduObj = {school, levelOfStudy, fieldOfStudy, from, to, current, description}

  try {

   
    let profile = await Profile.findOne({ user: req.user.id })

    const eduIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

    profile.education[eduIndex] = eduObj

    await profile.save()

    console.log(eduObj)
    console.log(profile.education[eduIndex])

    res.json(profile)
    
  } catch (err) {
   
    console.error(err)

    return res.status(500).send('server error') 

  }

})


// @route     GET /profile/github/:username
// @desc      Get user repos from GitHub
// @access    public
router.get('/github/:username', (req, res) =>  {

  try {

    const options = { 
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientID')}&client_secret=${config.get('githubClientSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if(error)console.error(error);

      if(response.statusCode !== 200){
        return res.status(404).json({msg:'Github user not found'})
      }

      res.json(JSON.parse(body))
    })
    
  } catch (err) {
   
    console.error(err)

    return res.status(500).send('server error') 

  }
})

module.exports = router
