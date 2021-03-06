import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {

  const authLinks = (
    <ul>
      <li><Link to="/dashboard"><i className="fas fa-user"></i>{'  '} <span className="hide.sm">Dashboard</span></Link></li>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/posts">Posts</Link></li>
      <li>
        <a onClick={logout} href="#!"> <i className="fas fa-sign-out-alt"></i>{' '} <span className="hide.sm">logout</span></a>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      
        {
          !loading &&

            <> { !isAuthenticated ? guestLinks : authLinks } </>
        }

    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state =>  ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
})


// export default Navbar
export default connect(mapStateToProps, {logout})(Navbar)










// return (
//   <nav className="navbar bg-dark">
//   <h1>
//     <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
//   </h1>
//   <ul>
//     <li><Link to="/profiles">Developers</Link></li>
//     {
//       !isAuthenticated ?
//       <>
//         <li><Link to="register">Register</Link></li>
//         <li><Link to="/login">Login</Link></li>
//       </>

//       :
      
//         <li onClick = {logout}>logout</li>

//     }
//   </ul>
// </nav>
// )