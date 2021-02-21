import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import store from '../../store';

function CreateProfile() {

  const {isCreate} = useParams()
  const stateProfile = useSelector(state => state.profile)
  const { profile, loading = true } = stateProfile
  const history = useHistory()
  const [showSocial, setShowSocial] = useState(false)

  useEffect(()=>{
    if(!isCreate&&!profile){
     store.dispatch(getCurrentProfile())
    }
    setFormData({
      company: profile&&profile.company?profile.company:'',
      website: profile&&profile.website?profile.website:'',
      location: profile&&profile.location?profile.location:'',
      status: profile&&profile.status?profile.status:'',
      skills: profile&&profile.skills?profile.skills:'',
      githubusername: profile&&profile.githubusername?profile.githubusername:'',
      bio: profile&&profile.bio?profile.bio:'',
      twitter: profile&&profile.social&&profile.social.twitter?profile.social.twitter:'',
      facebook: profile&&profile.social&&profile.social.facebook?profile.social.facebook:'',
      linkedin: profile&&profile.social&&profile.social.linkedin?profile.social.linkedin:'',
      youtube: profile&&profile.social&&profile.social.youtube?profile.social.youtube:'',
      instagram: profile&&profile.social&&profile.social.instagram?profile.social.instagram:''
    })
  },[stateProfile, getCurrentProfile])

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location:'',
    status: '',
    skills:'',
    githubusername: '',
    bio: '',
    twitter:'',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
  })
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const handleChange = e => {
    setFormData({...formData, [e.target.name]:e.target.value});
    e.target.classList.remove('errorBorder')
  }

  const redBorder = (action) => { //give empty input fields a red border
    const inputs = Array.from(document.querySelectorAll("[data-handle='required']"));
    inputs.forEach(i => {
      if(i.value===''||action==='remove'){
        i.classList[action]('errorBorder');
        i.classList[action]('shakeSlow');
        setTimeout(()=>i.classList.remove('shakeSlow'),550)
      }
    })
  }

  const handleSubmit = (e) => {

    const { company, status, skills } = formData

    e.preventDefault()
    
    if(!company&&!status&&!skills) return redBorder('add') 
    
    console.log('SUBMIT')
    store.dispatch(createProfile(formData, history, !isCreate))

    // setTimeout(()=>{ history.push("/dashboard") },500)
      
  }

  return (
    <>
      <h1 className="large text-primary">
      {isCreate ? 'Create Your Profile' : 'Edit Your Profile'}
      </h1>

      {
        isCreate &&
        <>
          <p className="lead">
            <i className="fas fa-user"></i> Let's get some information to make your
            profile stand out
          </p>
          <small>* = required field</small>
        </>
      }
      
      <form className="form" onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => handleChange(e)} data-handle='required'>
            <option value="">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={(e) => handleChange(e)} data-handle='required'/>
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={(e) => handleChange(e)} />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => handleChange(e)} />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={(e) => handleChange(e)} data-handle='required'/>
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername} onChange={(e) => handleChange(e)}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e) => handleChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light" onClick={()=>setShowSocial(!showSocial)}>
            {!showSocial ? 'Add Social Network Links': 'Cancel'}
          </button>
         {!showSocial &&  <span style={{fontSize:'12px'}}>*Optional</span>}
        </div>

        {showSocial &&
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={(e) => handleChange(e)}/>
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(e) => handleChange(e)} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={(e) => handleChange(e)} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={(e) => handleChange(e)} />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={(e) => handleChange(e)} />
            </div>
          </>
        } 

        <input type="submit" className="btn btn-primary my-1" />
        <Link  to="/dashboard" className="btn btn-light my-1">Go Back</Link>
      </form>
    </>
  )
}

export default CreateProfile
