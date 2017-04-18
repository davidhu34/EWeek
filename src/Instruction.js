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
import AvMovie from 'material-ui/svg-icons/av/movie'

const Instruction = ({ index, instruction, isEditor,
    editIns, deleteIns, moveUp, moveDown, expand
}) => {
    const { name, type, content, repeat, then, link, expansion } = instruction
    const actionButtons = isEditor? <CardActions expandable={true}>
        <FlatButton label="edit"
            icon={<EditorModeEdit/>}
            onClick={editIns}/>/>
        <FlatButton label="delete"
            icon={<ActionDelete/>}
            onClick={deleteIns}/>
        <IconButton tooltip="upward"
            onClick={moveUp}>
            <NavigationArrowUpward/>
        </IconButton>
        <IconButton tooltip="downward"
            onClick={moveDown}>
            <NavigationArrowDownward/>
        </IconButton>
    </CardActions> : <CardActions expandable={true}>
        <FlatButton label="media link"
            icon={<AvMovie/>}
            onClick={(e) => {
                console.log('OPEN LINK', link)
                window.open(link)
            }}/>
    </CardActions>

    const repeatSeq = (repeat.from === repeat.to)?
        '#'+repeat.from: '#'+repeat.from+'~#'+repeat.to
    const repeatContent = 'repeat '+repeatSeq+' for '
        +repeat.times+' times. Then, go to #'+then
    const linkContent = isEditor?  <div>{link}</div>: null
    return <Card expanded={expansion} onExpandChange={expand}>
        <CardHeader
            title={String(index)+'. '+name}
            subtitle={type}
            actAsExpander={true}
            showExpandableButton={true}
        />
        <CardText expandable={true}>
            {content}
            {linkContent}
        </CardText>
        {type === 'repeat'? <CardText expandable={true}>
            {repeatContent}
        </CardText>:null}
        {actionButtons}
    </Card>
}

export default Instruction
//export default connect( state => ({}) )(Instruction)
