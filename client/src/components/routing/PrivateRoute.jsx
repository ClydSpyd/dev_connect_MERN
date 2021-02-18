// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Route, Redirect } from 'react-router-dom'

// const PrivateRoute = ({ component: Component, ...rest }) => {

//   const auth = useSelector(state => state.auth)

//   return (

//     <Route
//       {...rest}
//       render={props =>
//         !auth.isAuthenticated && !auth.loading ? (
//           <Redirect to='/login' />
//         ) : (
//           <Component {...props} />
//         )
//       }
//     />

//   )

// }

// export default PrivateRoute













import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth: {isAuthenticated, loading}, ...rest }) => (
  <Route 
    {...rest} 
    render={props => 
      !isAuthenticated && !loading ? (
        <Redirect to='/login' /> 
      ) : (
        <Component {...props} />
      ) 
    }
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
