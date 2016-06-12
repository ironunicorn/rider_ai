import React from 'react'
import Avatar from 'material-ui/Avatar'
import FloatingActionButton from 'material-ui/FloatingActionButton';

const AboutAndrew = () => (
  <div style={{margin: "20px", lineHeight: "1.5"}}>
    <div style={{textAlign: "center"}}>
      <a href="https://github.com/arider">
        <FloatingActionButton mini={true} style={{margin: "5px"}}>
          <img src="client/assets/GitHub-Mark-Light-32px.png" />
        </FloatingActionButton>
      </a>
      <a href="https://www.linkedin.com/in/drandrewrider">
        <FloatingActionButton mini={true} style={{margin: "5px"}}>
          <img src="client/assets/linked-in-button.png" />
        </FloatingActionButton>
      </a>
    </div>
  </div>
)

export default AboutAndrew
