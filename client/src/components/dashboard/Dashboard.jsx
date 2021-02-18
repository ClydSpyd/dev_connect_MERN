import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'

function Dashboard({ profile: { profile, error, loading } , getCurrentProfile, auth, auth: { isAuthenticated, user } }) {

  useEffect(()=>{ getCurrentProfile() },[])
  
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if(!isAuthenticated&&!auth.loading) return <Redirect to="/login" />

  


  return loading && profile === null ? 
  
      <Spinner /> 
    : 
      <> 
        
        <h1 className="large text-primary">Dashboard</h1>
        <h6 className="lead">
          <i className="fas fa-user">{' '}Welcome {user && user.name}</i>
        </h6>

        {
          profile !== null ? (

            <DashboardActions />
            
          ) : (
            <>
              <p>You have not yet set up a profile, please add some info</p>
              <Link to ="/edit-profile/true" className="btn btn-primary my-1">Create profile</Link>
            </>
          )
        }
        
      </>
}

Dashboard.propTypes = { 
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
// export default Dashboard
