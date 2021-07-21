import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const GuardRouteAuthRequired = ({component: Component, setCurrentUser, ...rest}) => {
    
    const token = localStorage.getItem('auth_token');

    return (
        <Route {...rest} render={(props)=>(        
            token === null ? <Redirect to='/login' /> : <Component {...props} setCurrentUser={setCurrentUser} />
        )} />
    );
}

const GuardRouteAuthAlreadyRequired = ({component: Component, setCurrentUser, ...rest}) => {

    const token = localStorage.getItem('auth_token');

    return (
        <Route {...rest} render={(props)=>(        
            token === null ? <Component {...props} setCurrentUser={setCurrentUser} /> : <Redirect to='/' />
        )} />
    );
}

export {
    GuardRouteAuthRequired, GuardRouteAuthAlreadyRequired    
}