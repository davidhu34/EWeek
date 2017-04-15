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

const Instruction = ({ index, instruction, isEditor,
    deleteIns
}) => {
    const { name, type, content } = instruction
    const actionButtons = isEditor? <CardActions expandable={true}>
        <FlatButton label="edit" icon={<EditorModeEdit/>}/>
        <FlatButton label="delete"
            icon={<ActionDelete/>}
            onClick={deleteIns}/>
        <IconButton tooltip="upward">
            <NavigationArrowUpward/>
        </IconButton>
        <IconButton tooltip="downward">
            <NavigationArrowDownward/>
        </IconButton>
    </CardActions> : null

    return <Card>
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

export default Instruction
//export default connect( state => ({}) )(Instruction)
