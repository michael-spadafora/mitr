import React from 'react'

class Post extends React.Component {
  constructor(props) {
    super(props)
    console.log("post props:" + props)
    this.state = {
      username: props.username,
      followers: props.followers,
      following: props.following,
    }
  } 
    render() {
      return (
      <div>
        <h1>Username: {this.state.username} </h1>
        <br/>
        <h1>number of followers: {this.state.followers} </h1>
        <br/>
        <h1>number of following: {this.state.following} </h1>
      </div>
      )
    }
  }
export default Post