import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { Tabs, Tab } from 'material-ui/Tabs'

import { updateLogin, submitLogin } from './actions'
import { textFieldStyle } from './styles'
const Login = ({ login, updateLogin, submitLogin }) => {
        return <div style={{padding:30}}>
        <TextField {...textFieldStyle}
            floatingLabelText="班級"
            onChange={updateLogin('Class')}
        />
        <TextField {...textFieldStyle}
            floatingLabelText="組別"
            onChange={updateLogin('team')}
        />
        <TextField {...textFieldStyle}
            floatingLabelText="密碼"
            onChange={updateLogin('password')}
        />
        <FlatButton label="登入"
            style={{color: "#466BB0"}}
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
