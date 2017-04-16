import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Add } from './actions'

import FlatButton from 'material-ui/FlatButton'
import Program from './Program'
import Modal from './Modal'
const App = ({ data, Add }) => {
    const size = window.innerWidth + 'x' + window.innerHeight
    const screenSize = screen.width + 'x' + screen.height
    return <div>
        <Program />
        <Modal />
    </div>
}


export default connect(
    state => ({ ...state }),
    dispatch => ({
        Add: () => dispatch( Add() )
    })
)(App)
