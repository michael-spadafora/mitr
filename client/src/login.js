import React, { Component } from 'react';
import axios from 'axios';
import baseURL from './constants/constants'


export default class Login extends Component {
    constructor(props) {
      super(props)
      this.state = {
        username : '',
        password: ''
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
        let url = 'http://130.245.168.250/api/login'

        axios.post(url, 
        {
            username: this.state.username,
            password: this.state.password,
            headers: {
                'Content-Type': 'application/json'
            }
        }, {withCredentials: true})
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                this.props.history.push({
                    pathname: '/dashboard', 
                    data: 'test'
                }); //functions as redirect
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
    };

    render() {
      return (
        <div>

        <form onSubmit={this.onSubmit}>
          <h1>Login Below!</h1>
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
         <input type="submit" value="Submit"/>
         </form>

         <br></br>
         <a href='/register'>
            <button>register</button>  
        </a>
        <a href='/verify'>
            <button>verify</button>  
        </a>
        </div>
      );
    }
  }