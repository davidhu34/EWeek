import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { Tabs, Tab } from 'material-ui/Tabs'

import { updateLogin, submitLogin } from './actions'
import { textFieldColors } from './styles'
const Login = ({ login, updateLogin, submitLogin }) => {
    return <div>
        <TextField {...textFieldColors}
            floatingLabelText="班級"
            fullWidth={true}
            onChange={updateLogin('Class')}
        />
        <TextField {...textFieldColors}
            floatingLabelText="隊伍"
            fullWidth={true}
            onChange={updateLogin('team')}
        />
        <TextField {...textFieldColors}
            floatingLabelText="密碼"
            fullWidth={true}
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
