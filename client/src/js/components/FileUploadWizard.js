import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import FileInput from '../components/FileInput'
import FieldBreakdown from '../components/FieldBreakdown'

export default class FileUploadWizard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0,
      learn: "",
      predict: "",
      learnHeaders: [],
      predictHeaders: []
    }
    this.formData = new FormData()
  }

  handleNext(ref) {
    const {stepIndex} = this.state
    this.setState({
      stepIndex: stepIndex + 1
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

  addFields(name, headers) {
    const {stepIndex} = this.state
    const toChange = {stepIndex: stepIndex + 1}
    toChange[name] = headers
    this.setState(toChange)
  }

  handleSubmit() {
    const { handleLearn } = this.props
    handleLearn(this.formData)
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <FileInput id="learn"
                       maxFileSize={1000000}
                       fileName={this.state.learn}
                       addFields={this.addFields.bind(this, "learnHeaders")}
                       addFile={this.addFile.bind(this)} />
            <div style={{marginTop: 12, textAlign: "center"}}>
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
                       maxFileSize={1000000}
                       fileName={this.state.predict}
                       addFields={this.addFields.bind(this, "predictHeaders")}
                       addFile={this.addFile.bind(this)} />
            <div style={{marginTop: 12, textAlign: "center"}}>
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
        const { learnHeaders, predictHeaders } = this.state
        const predictSet = new Set(predictHeaders)
        const toLearn = learnHeaders.filter((field) => predictSet.has(field))
        const toPredict = learnHeaders.filter((field) => !predictSet.has(field))

        return (
          <div style={{width: '100%'}}>
            <FieldBreakdown
              toLearn={toLearn}
              toPredict={toPredict}
            />
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
                disabled={!toLearn.length || !toPredict.length}
                onTouchTap={this.handleSubmit.bind(this)}
              />
            </div>
          </div>
        )
      default:
        return 'Ack! Too far!'

    }
  }

  render() {
    const {stepIndex} = this.state
    const contentStyle = {margin: '0 16px'}

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} linear={false} >
          <Step>
            <StepLabel>Choose a training data set</StepLabel>
          </Step>
          <Step>
            <StepLabel>Choose a testing data set (one with missing column(s))</StepLabel>
          </Step>
          <Step>
            <StepLabel>Train and Predict!</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          <div>{this.getStepContent(stepIndex)}</div>
        </div>
      </div>
    )
  }
}
