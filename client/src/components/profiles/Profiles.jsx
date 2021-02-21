import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import store from '../../store'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'

const Profiles = () => {

  const profile = useSelector(state => state.profile)
  const { profiles, loading } = profile
  useEffect(()=>{ store.dispatch(getProfiles()) },[getProfiles])




  return loading ? 
  
      <Spinner /> 
  :

    <>
      <h1 className="text-primary">Developers</h1>

      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
      </p>
      <div className="profiles">
        {
            profiles.length ? (
              profiles.map(profile =>
              <ProfileItem key={profile._id} profile={profile} />
              )
            ) 
        : 
            <h4>No profiles found</h4>
        }
      </div>

    </>
}

export default Profiles
