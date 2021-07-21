import React, { Component } from 'react';
import BarNavegation from './components/BarNavegation';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import {Container} from 'react-bootstrap';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './components/Home';

import { GuardRouteAuthRequired, GuardRouteAuthAlreadyRequired } from './guard/GuardeRoute';
import StatisticDetail from './components/StatisticDetail';
import AddStatistic from './components/AddStatistic';

class App extends Component {

  state = {
    'current_user': ''
  }

  setCurrentUser = (current_user) => {
    this.setState({'current_user': current_user});
  }

  componentDidMount(){
    this.setState({'current_user': localStorage.getItem('current_user')});
  }

  render() {
    
    const currentUser = this.state.current_user;
    
    return <>
              <BrowserRouter>
                <BarNavegation current_user={currentUser} setCurrentUser={this.setCurrentUser} />
                <Container>
                <Switch>                                      
                    <GuardRouteAuthAlreadyRequired path='/login' component={LoginForm} setCurrentUser={this.setCurrentUser}/>
                    <GuardRouteAuthAlreadyRequired path='/singup' component={SignupForm}/>
                    <GuardRouteAuthRequired exact path='/' component={Home} setCurrentUser={this.setCurrentUser} /> 
                    <GuardRouteAuthRequired path='/statictic/add' component={AddStatistic} setCurrentUser={this.setCurrentUser} /> 
                    <GuardRouteAuthRequired path='/statictic/detail/:id' component={StatisticDetail} setCurrentUser={this.setCurrentUser} />                                        
                  </Switch>    
                </Container>                    
              </BrowserRouter>                                         
          </>    
  }
}

export default App;