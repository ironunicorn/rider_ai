import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import Baby from 'babyparse'

export default class FileInput extends Component {
  constructor(props) {
    super(props)
    this.state = {errorText: ""}
    this.fileReader = new FileReader()
    this.fileReader.onload = this.getHeaders.bind(this)
  }

  getHeaders(e) {
    const { addFields, maxFileSize } = this.props
    const parsed = Baby.parse(this.fileReader.result)
    const headers = parsed.data[0]
    addFields(headers)
  }

  onChange() {
    const { id, addFile, maxFileSize } = this.props
    const file = this.refs[id].files[0]
    if (file.type !== "text/csv") {
      return this.setState({errorText: "File must be CSV"})
    }
    if (file.size > maxFileSize) {
      return this.setState({errorText: "File size exceeds 1MB limit."})
    } else {
      this.setState({errorText: ""})
    }
    this.fileReader.readAsText(file)
    addFile(id, file)
  }

  render() {
    const { id, fileName } = this.props
    const { errorText } = this.state
    return (
      <div style={{textAlign: "center"}} >
        <input
          type="file"
          accept=".csv"
          id={id}
          ref={id}
          className="inputfile"
          onChange={this.onChange.bind(this)}/>
        <label htmlFor={id} >
          <RaisedButton
            label={fileName ? "Edit" : "Upload"}
            secondary={true}
            style={{marginRight: "10px"}}
            icon={<FontIcon className="material-icons" >file_upload</FontIcon>}
          />
        </label>
        <TextField
          disabled={true}
          id={id + 'name'}
          value={fileName}
          errorText={errorText}
        />
      </div>
    )
  }
}
