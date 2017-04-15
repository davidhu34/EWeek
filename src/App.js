import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Add } from './actions'

import FlatButton from 'material-ui/FlatButton'
import Program from './Program'

const App = ({ data, Add }) => (
    <div>
        <div>{data}</div>
        <div onClick={Add}>
            add
        </div>
        <Program />
    </div>
)


export default connect(
    state => ({ ...state }),
    dispatch => ({
        Add: () => dispatch( Add() )
    })
)(App)
