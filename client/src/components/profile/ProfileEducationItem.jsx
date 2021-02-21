import React from 'react'
import Moment from 'react-moment'

const ProfileEducationItem = ({ item: {
  school,
  levelOfStudy,
  fieldOfStudy,
  from,
  to,
  current,
  description
} }) => {

  return (
    <div>
      <h3>{school}</h3>
      <p> <Moment format='YYYY/MM/DD'>{from}</Moment> -
        {current ? 'Present' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p><strong>Level of Study: </strong>{levelOfStudy}</p>
      <p><strong>Field Of Study: </strong>{fieldOfStudy}</p>
     { description && <p> <strong>Description: </strong>{description} </p> }
    </div>
  )
}

export default ProfileEducationItem
