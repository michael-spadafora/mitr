import React from 'react'

class Post extends React.Component {
  constructor(props) {
    super(props)
    console.log("post props:" + props)
    this.state = {
        email: props.location.email,
      followers: props.location.followers,
      following: props.location.following,
    }
  } 
    render() {
      return (
      <div>
        <h1>email: {this.state.email} </h1>
        <br/>
        <h1>number of followers: {this.state.followers} </h1>
        <br/>
        <h1>number of following: {this.state.following} </h1>
      </div>
      )
    }
  }
export default Post