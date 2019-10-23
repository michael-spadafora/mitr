import React from 'react'

class Post extends React.Component {
  constructor(props) {
    super(props)
    console.log("post props:" + props)
    this.state = {
      username: props.username,
      content: props.content
    }
  } 
    render() {
      return (
      <div>
        <h1>{this.state.username} says {this.state.content}</h1>
      </div>
      )
    }
  }
export default Post