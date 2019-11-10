import React from 'react'
import Post from './post'

class FollowerOrFollowingDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: props.location.username,
            userList: props.location.userList,
            type: props.type
        };
        console.log('display props:' + props.location.data)
    }

    render() {
      return (
        <div>
            <h1>list of users {this.state.type} {this.state.username}</h1>
        {this.state.userList.map((userName) => {
          return <div>  userName </div>;
        })}
      </div>

      )
    }
  }
export default FollowerOrFollowingDisplay