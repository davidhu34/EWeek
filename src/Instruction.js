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

const Instruction = ({ index, instruction, status }) => {
    const { name, type } = instruction
    return <Card>
        <CardHeader
            title={String(index)+". "+name}
            subtitle={type}
            actAsExpander={true}
            showExpandableButton={true}
        />
        <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions expandable={true}>
            <FlatButton icon={<EditorModeEdit/>}/>
            <FlatButton icon={<ActionDelete/>}/>
            <FlatButton label="move" disabled={true}/>
            <IconButton tooltip="upward">
                <NavigationArrowUpward/>
            </IconButton>
            <IconButton tooltip="downward">
                <NavigationArrowDownward/>
            </IconButton>
        </CardActions>
    </Card>
}

export default Instruction/*connect(
    state => ({})
)(ListItem)*/
