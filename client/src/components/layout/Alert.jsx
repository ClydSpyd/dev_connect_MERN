import React from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'


const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(
  alert => (
    <div className={`alert alert-${alert.alertType}`} key={alert.id}>
      {alert.msg}
    </div>
  )
)

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,

}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert)


// const Alert = () =>{ 
  
//   const alerts = useSelector(state => state.alert)

//   return(

//     <>
//     { alerts && alerts.length > 0 &&

//         alerts.map(
//             alert => (
//               <div className={`alert alert-${alert.alertType}`} key={alert.id}>
//                 {alert.msg}
//               </div>
//             )
//         )

//     }

//     </>
//   )
  
//   export default Alert
