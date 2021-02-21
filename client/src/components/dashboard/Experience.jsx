import React from 'react'
import Moment from 'react-moment'
import { useHistory } from 'react-router-dom'
import { deleteExperience } from '../../actions/profile'
import store from '../../store'

const Experience = ({ experience }) => {

  const history = useHistory()

  const experiences = experience.map(item => 
    <tr key={item._id}>
      <td >{item.company}</td>
      <td className="hide-sm">{item.title}</td>
      <td className="hide-sm">
        <Moment format='YYYY/MM/DD'>{item.from}</Moment> - 
        {item.current ? 'Present' : <Moment format='YYYY/MM/DD'>{item.to}</Moment>}
      </td>
      <td>
        <button onClick={()=>{ store.dispatch(deleteExperience(item._id, history)) }} className="btn btn-danger">Delete</button>
      </td>
    </tr>
    )
  return (
      <>
        <h2 className="my-2">Experience</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {experiences}
          </tbody>
        </table>
      </>
  )
}

export default Experience
