import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { dialogAction, updateTemp } from './actions'

const Modal = ({ modal, program, instruction,
    dialogAction, updateTemp
}) => {
    const { open, type, title, note } = modal
    const actionButtons = [
        <FlatButton label={type}
            onClick={dialogAction(type, program, instruction)} />,
        <FlatButton label="cancel"
            onClick={dialogAction('close')} />,
    ]
    const editor = type==='update' || type==='create'? <span>
        <TextField
            floatingLabelText="Name"
            fullWidth={true}
            defaultValue={instruction.name}
            onChange={updateTemp('name')}
        />
        <SelectField
            fullWidth={true}
            floatingLabelText="Type"
            value={instruction.type === 'do'? 1: 2}
            onChange={updateTemp('type')}
        >
            <MenuItem value={1} primaryText="do" />
            <MenuItem value={2} primaryText="repeat" />
        </SelectField>
        <TextField
            floatingLabelText="Content"
            multiLine={true}
            fullWidth={true}
            defaultValue={instruction.content}
            onChange={updateTemp('content')}
        />
        {(instruction.type==='repeat')? <span>
            repeat
            <TextField
                floatingLabelText="From #"
                fullWidth={true}
                defaultValue={
                    instruction.repeat?
                        instruction.repeat.from: ''
                }
                onChange={updateTemp('from')}
            />
            <TextField
                floatingLabelText="To #"
                fullWidth={true}
                defaultValue={
                    instruction.repeat?
                        instruction.repeat.to: ''}
                onChange={updateTemp('to')}
            />
            <TextField
                floatingLabelText="Repeat Times"
                fullWidth={true}
                defaultValue={
                    instruction.repeat?
                        instruction.repeat.times: ''}
                onChange={updateTemp('times')}
            />
            <TextField
                floatingLabelText="After all repetition, to #"
                fullWidth={true}
                defaultValue={
                    instruction.then?
                        instruction.then: ''}
                onChange={updateTemp('then')}
            />
        </span>: null}
    </span> : null
    return <Dialog
        modal={true}
        open={open}
        title={title}
        actions={actionButtons}
    >
        {note}
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
            (e, idx, v) => dispatch( updateTemp(attr, e.target.value || v) )
    })
)(Modal)
