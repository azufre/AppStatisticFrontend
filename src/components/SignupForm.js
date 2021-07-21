import React from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {

  empty_form = {
    email:'',
    password: '',
  };

  state = {
    isRegisterSuccess:false,
    form:{
      email:'',
      password: '',
    },
    disabled:false,
    errors:''
  };

  handle_change = e => {

    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState.form[name] = value;
      return newState;
    });

  };

  handle_login = (e) => {

    const url_register = `${process.env.REACT_APP_API_BACKEND}/auth/signup/`;
    const data = this.state.form;
    this.setState({disabled:true});

    this.setState({
      errors:'',
      isRegisterSuccess:false
    });

    axios.post(url_register, data).then(response => {

      this.setState({
        errors:'',
        isRegisterSuccess:true
      });

      this.setState({disabled:false});

    }).catch(error => {

      if(error.response.status && error.response.status === 400){

        this.setState({
          errors: error.response.data.msg,
          isRegisterSuccess:false
        });
        
      }

      this.setState({disabled:false});

    });

    e.preventDefault();

  }

  successSignup = (
    <div style={{'width':'400px', 'height':'300px', 'backgroundColor':'white', 'padding':'15px', 'margin':'auto'}}>
      <h1>Sing up</h1>      
      <span style={{'display':'block'}}>Sign up success. Please go to <Link to="/login">Login.</Link></span>      
    </div>
  );

  render() {

    return (<>
      {this.state.isRegisterSuccess ?  this.successSignup :
      <div style={{'width':'400px', 'backgroundColor':'white', 'padding':'15px', 'margin':'auto'}}>
        <h1>Sing up</h1>    

        {this.state.errors ? <div className="alert alert-warning" role="alert">{this.state.errors}</div> : ""}
                 
        <Form onSubmit={this.handle_login}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.form.email}
           onChange={this.handle_change} required/>
        </Form.Group>
        <br/>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={this.state.form.password}
           onChange={this.handle_change} required/>
        </Form.Group>
        <hr/>
        <Button variant="primary" type="submit" disabled={this.state.disabled}>
          Login
        </Button>
      </Form>
      </div>}</>
    );
  }
}

export default SignupForm;
