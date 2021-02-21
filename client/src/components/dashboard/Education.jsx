import React from 'react'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profile'
import store from '../../store'

const Education = ({ education }) => {

  const educationRows = education.map(item => 
    <tr key={item._id}>
      <td >{item.school}</td>
      <td className="hide-sm">{item.levelOfStudy}</td>
      <td className="hide-sm">{item.fieldOfStudy}</td>
      <td className="hide-sm">
        <Moment format='YYYY/MM/DD'>{item.from}</Moment> - 
        {item.current ? 'Present' : <Moment format='YYYY/MM/DD'>{item.to}</Moment>}
      </td>
      <td>
        <button onClick={()=> store.dispatch( deleteEducation(item._id) ) } className="btn btn-danger">Delete</button>
      </td>
    </tr>
    )
  return (
      <>
        <h2 className="my-2">Education</h2>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Level of Study</th>
              <th className="hide-sm">Field of Study</th>
              <th className="hide-sm">Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {educationRows}
          </tbody>
        </table>
      </>
  )
}

export default Education
