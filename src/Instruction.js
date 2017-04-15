import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'

import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward'
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward'

const orderButtons = [
    <FlatButton label="move" disabled={true}/>,
    <IconButton tooltip="upward">
        <NavigationArrowUpward/>
    </IconButton>,
    <IconButton tooltip="downward">
        <NavigationArrowDownward/>
    </IconButton>
]
const editButtons =  [
    <FlatButton label="save" icon={<EditorModeEdit/>}/>,
    <FlatButton label="cancel"/>
]
const viewButtons = [
    <FlatButton label="edit" icon={<EditorModeEdit/>}/>,
    <FlatButton label=""delete icon={<ActionDelete/>}/>
]

const Instruction = ({ index, instruction,
    isEditor, viewing, editing
}) => {
    const { name, type, content } = instruction
    const actionButtons = isEditor && viewing? 
        <CardActions expandable={true}>
        {[
            ...(editing? editButtons: viewButtons),
            ...orderButtons
        ]}
        </CardActions>
        : null
    return <Card initiallyExpanded={viewing}
        onExpandChange={ (willExpand) => {
          if(willExpand) {}//change view
        }}>
        <CardHeader
            title={String(index)+". "+name}
            subtitle={type}
            actAsExpander={true}
            showExpandableButton={true}
        />
        <CardText expandable={true}>
            {content}
        </CardText>
        {actionButtons}
    </Card>
}

export default Instruction/*connect(
    state => ({})
)(Instruction)*/
