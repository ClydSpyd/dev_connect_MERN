import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { addEducation } from '../../actions/profile'
import store from '../../store';

const AddEducation = () => {

  const [ formData, setFormData ] = useState({
    school: '',
    levelOfStudy: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })
  const history = useHistory()

  const { school, levelOfStudy, fieldOfStudy, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault()
    store.dispatch(addEducation(formData, history))
  }

  return (
    <>
      <h1 className="large text-primary">
        Add Education
      </h1>
      <p className="lead"> Add any education you have
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="* Level of Study" name="levelOfStudy" value={levelOfStudy} onChange={(e)=>onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* school" name="school" value={school} onChange={(e)=>onChange(e)}  required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field of study" name="fieldOfStudy" value={fieldOfStudy} onChange={(e)=>onChange(e)}  />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={(e)=>onChange(e)}  />
        </div>
        <div className="form-group">
          <p><input type="checkbox" name="current" value="" value={current} onChange={(e)=> {setFormData({...formData, current: !current})}} /> {' '}Current</p>
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

export default AddEducation
