import React from 'react'
import { Link } from 'react-router-dom'

function ProfileItem({profile}) {

  const { status, company, location, skills, user } = profile
  
  return user && (
    <div className="profile bg-light">
      <img src={user.avatar} alt="pic" className="round-img"/>
      <div>
        <h2>{user.name}</h2>
        <p>{status} {company && <span>at {company}</span>}</p>
        <p className="my-2">{ location && location}</p>
        <Link className="btn btn-primary" to={`/profile/${profile.user._id}`}>view profile</Link>
      </div>

      <ul>
       {
        skills.slice(0, 4).map((skill, idx) => (
          <li className="text-primary" key={idx}> <i className="fas fa-check"></i> {skill}</li>
        ))
        }
      </ul>

    </div>
  )
  
}

export default ProfileItem
