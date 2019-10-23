import React, { Component } from 'react';
import axios from 'axios';
import baseURL from './constants/constants'


export default class Register extends Component {
    constructor(props) {
      super(props)
      this.state = {
        username : '',
        password: '',
        email: ''
      };
    }  
    handleInputChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    } 
    
    onSubmit = (event) => {
        event.preventDefault();
        let url = 'http://130.245.168.201/api/adduser'
        axios.post(url,
        {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                this.props.history.push('/verify'); //functions as redirect
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error registering. try a different username');
        });
    };

    render() {
      return (
        <form onSubmit={this.onSubmit}>
          <h1>Register Here</h1>
          <input
            type="username"
            name="username"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
         <input type="submit" value="Submit"/>
        </form>
      );
    }
  }