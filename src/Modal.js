import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { dialogAction } from './actions'

const Modal = ({ modal, instructions, dialogAction }) => {
    const { open, type, title, content } = modal
    console.log(dialogAction('close'))
    const actionButtons = [
        <FlatButton label={type} onClick={dialogAction('delete')} />,
        <FlatButton label="cancel" onClick={dialogAction('close')} />,
    ]
    return <Dialog
        modal={true}
        open={open}
        title={title}
        actions={actionButtons}
    >
        {content}
        <TextField
            floatingLabelText="Name"
        />
        <TextField
            floatingLabelText="type"
        />
        <TextField
            floatingLabelText="Content"
        />
        <TextField
            floatingLabelText="Next"
        />
    </Dialog>
}


export default connect(
    state => {
        const modal = state.modal
        const viewing = state.user.viewing
        const program = state.programs[viewing]
        const ins = program.instructionOrder[modal.idx]
        return {
            modal: modal,
            instructions: program.instructions[ins]
        }
    },
    dispatch => ({
        dialogAction: (dialogType, ins, idx) =>
            (e) => dispatch( dialogAction[dialogType](ins, idx) )
    })
)(Modal)
