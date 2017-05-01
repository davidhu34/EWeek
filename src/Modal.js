import React, { Component } from 'react';
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
//import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'

import ContentSave from 'material-ui/svg-icons/content/save'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add'

import { dialogAction, closeDialog, updateTemp } from './actions'
import { textFieldStyle } from './styles'

const Modal = ({ modal, program, instruction, saving,
    dialogAction, closeDialog, updateTemp
}) => {
    const { open, type, title, note, scroll } = modal

    const actionProps = {
        update: {
            label: '確認更新',
            icon: <ContentSave />
        },
        delete: {
            label: '刪除',
            icon: <ActionDelete />
        },
        create: {
            label: '建立',
            icon: <ActionNoteAdd />
        }
    }
    const actionButtons = saving? <CircularProgress color="#466BB0"/>
        : <CardActions>
            <RaisedButton {...actionProps[type]}
                style={{color:"#466BB0"}}
                onClick={dialogAction(type, program, instruction)} />
            <RaisedButton label="取消"
                onClick={closeDialog} />
        </CardActions>
    const editor = type==='update' || type==='create'? <span>
        <TextField
            floatingLabelText="指令"
            fullWidth={true}
            multiLine={true}
            defaultValue={instruction.name}
            {...textFieldStyle}
            onChange={updateTemp('name')}
        />
    </span> : null
    const body = document.body
    const html = document.documentElement
    const maxH = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight )
    return open? <div
        style={{
            zIndex: 3,
            width: '100%',
            height: maxH,
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.8)'
        }}>
    <div style={{
        width: '100%',
        position: 'absolute',
        top: scroll,
    }}>
        <Paper style={{ width: '80%',margin:'auto', marginTop: 30}}>
            <b>
            <CardHeader
                style={{ width: '100%', padding:10}}
                titleStyle={{fontSize:20, fontWeight:700}}
                subtitleStyle={{width:'100%'}}
                title={title}
                subtitle={note}
            />
            </b>
            <CardText>
                {editor}
            </CardText>
            {actionButtons}
        </Paper>
    </div></div>:null
}


export default connect(
    state => {
        const modal = state.modal
        const { viewing, saving } = state.user
        const program = state.programs[viewing]
        return {
            modal: modal,
            saving: saving,
            program: program.id,
            instruction: modal.tempIns
        }
    },
    dispatch => ({
        dialogAction: (dialogType, p, ins) =>
            (e) => dispatch( dialogAction(dialogType, p, ins) ),
        closeDialog: (e) => dispatch(closeDialog),
        updateTemp: (attr) =>
            (e, idx, v) => dispatch( updateTemp(attr, e.target.value || v) )
    })
)(Modal)

/*
//old version
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
*/
