import React, { Component } from 'react';
import axios from 'axios';
import baseURL from './constants/constants'


export default class Verify extends Component {
    constructor(props) {
      super(props)
      this.state = {
        email: '',
        key: ''
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
        axios.post(baseURL + '/verify', 
        {
            email: this.state.email,     
            key: this.state.key,      
          
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                this.props.history.push('/login'); //functions as redirect
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error verifying');
        });
    };

    render() {
      return (
        <form onSubmit={this.onSubmit}>
          <h1>Verify Here</h1>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="key"
            name="key"
            placeholder="Enter key"
            value={this.state.key}
            onChange={this.handleInputChange}
            required
          />
         <input type="submit" value="Submit"/>
        </form>
      );
    }
  }