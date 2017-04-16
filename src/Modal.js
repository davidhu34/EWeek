import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { dialogAction, updateTemp } from './actions'

const Modal = ({ modal, program, instruction,
    dialogAction, updateTemp
}) => {
    const { open, type, title, content } = modal
    const actionButtons = [
        <FlatButton label={type}
            onClick={dialogAction(type, program, instruction)} />,
        <FlatButton label="cancel"
            onClick={dialogAction('close')} />,
    ]
    const editor = type==='update' || type==='create'? <span>
        <TextField
            defaultValue={instruction.name}
            floatingLabelText="Name"
            onChange={updateTemp('name')}
        />
        <TextField
            defaultValue={instruction.type}
            floatingLabelText="type"
            onChange={updateTemp('type')}
        />
        <TextField
            defaultValue={instruction.content}
            floatingLabelText="Content"
            onChange={updateTemp('content')}
        />
        <TextField
            floatingLabelText="Next"
        />
    </span> : null
    return <Dialog
        modal={true}
        open={open}
        title={title}
        actions={actionButtons}
    >
        {content}
        {editor}
    </Dialog>
}


export default connect(
    state => {
        const modal = state.modal
        const viewing = state.user.viewing
        const program = state.programs[viewing]
        return {
            modal: modal,
            program: program.id,
            instruction: modal.tempIns
        }
    },
    dispatch => ({
        dialogAction: (dialogType, p, ins) =>
            (e) => dispatch( dialogAction[dialogType](p, ins) ),
        updateTemp: (attr) =>
            (e) => dispatch( updateTemp(attr, e.target.value) )
    })
)(Modal)
