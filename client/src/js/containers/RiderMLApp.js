import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { processData } from '../actions/mlAction'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FileInput from '../components/FileInput'

class RiderMLApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0,
      learn: "",
      predict: ""
    }
    this.formData = new FormData()
  }

  handleNext(ref) {
    const {stepIndex} = this.state
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

  addFile(name, file) {
    if (!file) return
    if (this.formData.get(name)) this.formData.delete(name)
    this.formData.append(name, file)
    const toUpdate = {}
    toUpdate[name] = file.name
    this.setState(toUpdate)
  }

  handleLearn() {
    const { dispatch } = this.props
    dispatch(processData(this.formData))
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <FileInput id="learn"
                       fileName={this.state.learn}
                       addFile={this.addFile.bind(this)} />
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
        )
      case 1:
        return (
          <div>
            <FileInput id="predict"
                       fileName={this.state.predict}
                       addFile={this.addFile.bind(this)} />
            <div style={{marginTop: 12}}>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onTouchTap={this.handlePrev.bind(this)}
                style={{marginRight: 12}}
              />
              <RaisedButton
                label='Next'
                primary={true}
                onTouchTap={this.handleNext.bind(this)}
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <div style={{textAlign: "center", marginTop: 12}} >
              <FlatButton
                label="Back"
                onTouchTap={this.handlePrev.bind(this)}
                disabled={stepIndex === 0}
                style={{marginRight: 12}}
              />
              <RaisedButton
                label="Learn"
                primary={true}
                onTouchTap={this.handleLearn.bind(this)}
              />
            </div>
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
        <Stepper activeStep={stepIndex} linear={false}>
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
          <div>{this.getStepContent(stepIndex)}</div>
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
