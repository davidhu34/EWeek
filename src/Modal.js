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
    const { open, type, title, note, scroll } = modal
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
        <TextField
            floatingLabelText="Link"
            fullWidth={true}
            defaultValue={instruction.link}
            onChange={updateTemp('link')}
        />
    </span> : null
    const body = document.body
    const html = document.documentElement
    const maxH = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight )
    console.log(body.scrollTop)
    return open? <div
        style={{
            zIndex: 2,
            width: '100%',
            height: maxH,
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(255,255,255,0.9)',
            //WebkitTextFillColor: 'transparent',
            //WebkitBackgroundClip: 'text'
        }}>
    <div style={{ position: 'absolute',top: scroll, left: 50}}>
        {note}
        {editor}
        {actionButtons}
    </div>
    </div>:null
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
