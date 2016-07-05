import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { processData, resetData } from '../actions/mlAction'
import CircularProgress from 'material-ui/CircularProgress'
import FileUploadWizard from '../components/FileUploadWizard'
import LinearVisualization from '../components/LinearVisualization'

class RiderMLApp extends Component {
  constructor(props) {
    super(props)
  }

  handleLearn(formData) {
    const { dispatch } = this.props
    dispatch(processData(formData))
  }

  handleReset() {
    const { dispatch } = this.props
    dispatch(resetData())
  }

  render() {
    const {learning, result} = this.props
    if (learning) {
      return (
        <div style={{textAlign: "center", marginTop: "20px"}}>
          <CircularProgress size={1.5} />
        </div>
      )
    } else if (Object.keys(result).length) {
      return (
        <LinearVisualization result={result}
                             handleReset={this.handleReset.bind(this)} />
      )
    } else {
      return <FileUploadWizard handleLearn={this.handleLearn.bind(this)}/>
    }
  }
}

RiderMLApp.propTypes = {
  data: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired,
  learning: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { data, result, lastUpdated, learning } = state.machineLearning || {
    data: [],
    result: {},
    learning: false,
  }
  return {
    data,
    result,
    learning,
    lastUpdated,
  }
}

export default connect(mapStateToProps)(RiderMLApp)
