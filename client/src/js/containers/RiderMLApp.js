import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

class RiderMLApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0
    }
    this.formData = new FormData()
  }

  onSubmit(e) {
    e.preventDefault()
    var formData = new FormData(document.querySelector("form"))
  }

  handleNext() {
    const {stepIndex} = this.state
    debugger
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    })
  }

  handlePrev() {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1})
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <form style={{textAlign: "center"}} >
            <input type="file" name="ml-learn" id="ml-learn" className="inputfile" ref="learn"/>
            <label htmlFor="ml-learn">
            <RaisedButton
              label="Upload"
              secondary={true}
            /></label>
          </form>
        )
      case 1:
        return (
          <form style={{textAlign: "center"}} >
            <input type="file" name="ml-predict" id="ml-predict" className="inputfile" ref="predict" />
            <label htmlFor="ml-predict">
            <RaisedButton
              label="Upload"
              secondary={true}
            /></label>
          </form>
        )
      case 2:
        return (
          <div style={{textAlign: "center"}} >
            <RaisedButton label="Learn" primary={true} />
          </div>
        )
      default:
        return 'You\'re a long way from home sonny jim!'
    }
  }


  render() {
    const {finished, stepIndex} = this.state
   const contentStyle = {margin: '0 16px'}

   return (
     <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
       <Stepper activeStep={stepIndex}>
         <Step>
           <StepLabel>Choose data to learn from</StepLabel>
         </Step>
         <Step>
           <StepLabel>Choose data with missing dimensions to predict</StepLabel>
         </Step>
         <Step>
           <StepLabel>Process!</StepLabel>
         </Step>
       </Stepper>
       <div style={contentStyle}>
         {finished ? (
           <p>
             <a
               href="#"
               onClick={(event) => {
                 event.preventDefault()
                 this.setState({stepIndex: 0, finished: false})
               }}
             >
               Click here
             </a> to reset the example.
           </p>
         ) : (
           <div>
             <div>{this.getStepContent(stepIndex)}</div>
             <div style={{marginTop: 12}}>
               <FlatButton
                 label="Back"
                 disabled={stepIndex === 0}
                 onTouchTap={this.handlePrev.bind(this)}
                 style={{marginRight: 12}}
               />
               <RaisedButton
                 label={stepIndex === 2 ? 'Finish' : 'Next'}
                 primary={true}
                 onTouchTap={this.handleNext.bind(this)}
               />
             </div>
           </div>
         )}
       </div>
     </div>
    )
  }
}

RiderMLApp.propTypes = {
  data: PropTypes.array.isRequired,
  isPosting: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { data, isPosting, lastUpdated } = state.machineLearning || {
    data: [],
    isPosting: false,
  }
  return {
    data,
    isPosting,
    lastUpdated,
  }
}

export default connect(mapStateToProps)(RiderMLApp)
