import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { Tabs, Tab } from 'material-ui/Tabs'

import { updateLogin, submitLogin } from './actions'

const Login = ({ login, updateLogin, submitLogin }) => {
    return <div>
        <TextField
            floatingLabelText="Class"
            fullWidth={true}
            onChange={updateLogin('Class')}
        />
        <TextField
            floatingLabelText="Team"
            fullWidth={true}
            onChange={updateLogin('team')}
        />
        <TextField
            floatingLabelText="Password"
            fullWidth={true}
            onChange={updateLogin('password')}
        />
        <FlatButton label="Login"
            fullWidth={true}
            onClick={submitLogin(login)}
        />
        {login.info}
    </div>
}


export default connect(
    state => ({ login: state.user.login }),
    dispatch => ({
        updateLogin: (attr) =>
            (e) => dispatch( updateLogin(attr, e.target.value) ),
        submitLogin: (login) => (e) => dispatch( submitLogin(login) )
    })
)(Login)
