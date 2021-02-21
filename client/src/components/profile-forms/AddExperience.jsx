import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { addExperience } from '../../actions/profile'
import store from '../../store';

const AddExperience = () => {

  const history = useHistory()
  const [ formData, setFormData ] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })

  const { company, title, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault()
    store.dispatch(addExperience(formData, history))
  }

  return (
    <>
      <h1 className="large text-primary">
        Add Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={(e)=>onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={(e)=>onChange(e)}  required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={(e)=>onChange(e)}  />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={(e)=>onChange(e)}  />
        </div>
        <div className="form-group">
          <p><input type="checkbox" name="current" value="" value={current} onChange={(e)=> {setFormData({...formData, current: !current})}} /> {' '}Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date"  value={to} onChange={(e)=>onChange(e)} disabled={current}  name="to" />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} onChange={(e)=>onChange(e)} 
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
    </>
  )
}

export default AddExperience
