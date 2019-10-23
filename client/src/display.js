import React from 'react'
import Post from './post'

class Display extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          posts: props.location.data
        };
        console.log('display props:' + props.location.data)
    }

    render() {
      return (
        <div>
        {this.state.posts.map((post) => {
          return <Post content={post.content} username={post.username}/>;
        })}
      </div>

      )
    }
  }
export default Display