import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

import { closeDialog } from './actions'

const Modal = ({ open, type, closeDialog }) => {
    const size = window.innerWidth + 'x' + window.innerHeight
    const screenSize = screen.width + 'x' + screen.height
    const actionButtons = [
        <FlatButton label="cancel" onClick={closeDialog} />
    ]
    return <Dialog
        modal={true}
        open={open}
        title={type}
        actions={actionButtons}
        >
    </Dialog>
}


export default connect(
    state => {
        return {
            open: state.modal.open,
            type: state.modal.type
        }
    },
    dispatch => ({
        closeDialog: (e) => dispatch( closeDialog() )
    })
)(Modal)
