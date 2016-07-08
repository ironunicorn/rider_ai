import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { processData, resetData } from '../actions/mlAction'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import FileUploadWizard from '../components/FileUploadWizard'
import LinearVisualization from '../components/LinearVisualization'

class RiderMLApp extends Component {
  constructor(props) {
    super(props)
    this.state = {closed: false}
  }

  handleLearn(formData) {
    const { dispatch } = this.props
    dispatch(processData(formData))
  }

  handleReset() {
    const { dispatch } = this.props
    dispatch(resetData())
  }

  closeSnackBar() {
    this.setState({closed: true})
  }

  render() {
    const {learning, result, failure} = this.props
    const {closed} = this.state
    if (learning) {
      return (
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <CircularProgress size={1.5} />
        </div>
      )
    } else if (Object.keys(result).length) {
      return (
        <LinearVisualization result={result}
                             handleReset={this.handleReset.bind(this)} />
      )
    } else {
      return (
        <div>
          <FileUploadWizard handleLearn={this.handleLearn.bind(this)}/>
          <Snackbar
            open={!!failure && !closed}
            message={failure + ' Please try again.'}
            autoHideDuration={3000}
            onRequestClose={this.closeSnackBar.bind(this)}
          />
        </div>
      )
    }
  }
}

RiderMLApp.propTypes = {
  data: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired,
  learning: PropTypes.bool.isRequired,
  failure: PropTypes.string.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { data,
          result,
          lastUpdated,
          learning,
          failure } = state.machineLearning || {
    data: [],
    result: {},
    learning: false,
    failure: ''
  }
  return {
    data,
    result,
    learning,
    failure,
    lastUpdated,
  }
}

export default connect(mapStateToProps)(RiderMLApp)
