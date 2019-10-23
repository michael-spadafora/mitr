import React, { Component } from 'react';
import axios from 'axios';
import baseURL from './constants/constants'

export default class Dashboard extends Component {
    constructor(props) {
      super(props)
      console.log(props)
      this.state = {
        message: '',
        //search
        timestamp: '',
        limit: '',
        
        //post
        content: '',

        //enter ID
        id: ''
      };
    }  
    handleInputChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    } 
    
    findOne = (event) => {
      event.preventDefault();
      console.log("get id: " + this.state.id)
      axios.get('http://130.245.168.201/api/item/' + this.state.id, 
      {   withCredentials: true,
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(res => {
          console.log(res)
          if (res.status === 200) {
              this.props.history.push({
                pathname: '/display',
                data: [res.data.item]
              }); //functions as redirect
          } else {
              const error = new Error(res.error);
              throw error;
          }
      })
      .catch(err => {
          console.error(err);
          alert('Error finding your mit');
      });
  };

    search = (event) => {
        event.preventDefault();
        axios.post('http://130.245.168.201/api/search', 
        {
            //search
            withCredentials: true,
            timestamp: this.state.timestamp,
            limit: this.state.limit,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                this.props.history.push({
                  pathname: '/display',
                  data: res.data.items
                }); //functions as redirect
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error searching');
        });
    };

    newPost = (event) => {
      event.preventDefault();
      axios.post(baseURL + '/additem', 
      {
          //search
          withCredentials: true,
          content: this.state.content,
          limit: this.state.limit,
          headers: {
              'Content-Type': 'application/json'
          }
      }, {withCredentials: true})
      .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.setState({
              message: "new post with id " + res.data.id
            })
          } else {
              const error = new Error(res.error);
              throw error;
          }
      })
      .catch(err => {
          console.error(err);
          alert('Error posting');
      });
  };

    render() {
      return (
        <div>
          <h1>{this.state.message}</h1>
          <form onSubmit={this.search}>
            <h1>search</h1>
            <input
              type="text"
              name="timestamp"
              placeholder="Enter timestamp(optional)"
              value={this.state.timestamp}
              onChange={this.handleInputChange}
              
            />
            <input
              type="text"
              name="limit"
              placeholder="Enter limit (optional) (min 25 max 100)"
              value={this.state.limit}
              onChange={this.handleInputChange}
              
            />
          <input type="submit" value="Submit"/>
          </form>

          <form onSubmit={this.newPost}>
            <h1>new post</h1>
            <input
              type="text"
              name="content"
              placeholder="Enter content"
              value={this.state.content}
              onChange={this.handleInputChange}
              required
            />
            <input type="submit" value="Submit"/>
          </form>

          <br></br>
          <form onSubmit={this.findOne}>
            <h1>search for one post</h1>
            <input
              type="text"
              name="id"
              placeholder="Enter id"
              value={this.state.id}
              onChange={this.handleInputChange}
              required
            />
            <input type="submit" value="Submit"/>
          </form>


        </div>
      );
    }
  }