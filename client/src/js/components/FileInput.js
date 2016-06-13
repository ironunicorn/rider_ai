import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

export default class FileInput extends Component {
  constructor(props) {
    super(props)
  }

  onChange() {
    const { id, addFile } = this.props
    const file = this.refs[id].files[0]
    addFile(id, file)
  }

  render() {
    const { id, fileName } = this.props
    return (
      <div style={{textAlign: "center"}} >
        <input
          type="file"
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
        />
      </div>
    )
  }
}
