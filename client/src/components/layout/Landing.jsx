import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

export const Landing = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  
  if(isAuthenticated) return <Redirect to="/dashboard" />
  
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <h6>{isAuthenticated}</h6>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to ="/register" className="btn btn-primary">Sign Up</Link>
            <Link to ="login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}


export default Landing







// import React from 'react'
// import { connect, useSelector } from 'react-redux'
// import { Link, Redirect } from 'react-router-dom'
// import PropTypes from 'prop-types'

// export const Landing = ({ isAuthenticated }) => {

//   if(isAuthenticated) return <Redirect to="/dashboard" />
  
//   return (
//     <section className="landing">
//       <div className="dark-overlay">
//         <div className="landing-inner">
//           <h1 className="x-large">Developer Connector</h1>
//           <h6>{isAuthenticated}</h6>
//           <p className="lead">
//             Create a developer profile/portfolio, share posts and get help from
//             other developers
//           </p>
//           <div className="buttons">
//             <Link to ="/register" className="btn btn-primary">Sign Up</Link>
//             <Link to ="login" className="btn btn-light">Login</Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// Landing.propTypes = {
//   isAuthenticated: PropTypes.bool,
// }

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// })

// export default connect(mapStateToProps)(Landing)
