import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { Tabs, Tab } from 'material-ui/Tabs'

import { updateLogin, submitLogin } from './actions'

const Login = ({ login, updateLogin, submitLogin }) => {
    return <div>
        <TextField
            floatingLabelText="班級"
            fullWidth={true}
            onChange={updateLogin('Class')}
        />
        <TextField
            floatingLabelText="隊伍"
            fullWidth={true}
            onChange={updateLogin('team')}
        />
        <TextField
            floatingLabelText="密碼"
            fullWidth={true}
            onChange={updateLogin('password')}
        />
        <FlatButton label="登入"
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
