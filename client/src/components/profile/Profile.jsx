import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getProfileById } from '../../actions/profile';
import store from '../../store';
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperienceItem from './ProfileExperienceItem';
import ProfileEducationItem from './ProfileEducationItem';
import ProfileGithub from './ProfileGithub';


const Profile = ({ profile: { profile, loading }, auth }) => {

  const { userId } = useParams();

  useEffect(() => {
    store.dispatch(getProfileById(userId))
  }, [])

  return loading ?

    <Spinner />

    : profile &&

    <div>
      <Link to="/profiles" className="btn btn-light">Back to profiles</Link>
      {
        auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id && <Link to="/edit-profile" className="btn btn-dark">Edit profile</Link>
      }
      <div className="profile-grid my-1">
        <ProfileTop profile={profile}/>
        <ProfileAbout profile={profile} />
        <div className="profile-exp bg-white p-2">
          <h2 class="text-primary">Experience</h2>
          {
            profile.experience.length ? 
              profile.experience.map((item, idx) =>
                <ProfileExperienceItem key={idx} item={item} />
              )
            :
              <h4>No experience listed</h4>
          }

        </div>

        <div className="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
          {
            profile.education.length ? 
              profile.education.map((item, idx) =>
                <ProfileEducationItem key={idx} item={item} />
              )
            :
              <h4>No education listed</h4>
          }
        </div>


        {
            profile.githubusername &&
              <ProfileGithub username={profile.githubusername} />
          }

      </div>
    </div>
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
})

// export default Profile
export default connect(mapStateToProps, {})(Profile)
