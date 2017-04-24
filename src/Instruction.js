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
        <FlatButton label="編輯" style={{color: "#466BB0"}}
            icon={<EditorModeEdit/>}
            onClick={editIns}/>/>
        <FlatButton label="刪除" style={{color: "#466BB0"}}
            icon={<ActionDelete/>}
            onClick={deleteIns}/>
        <IconButton tooltip="往上移動" style={{color: "#466BB0"}}
            onClick={moveUp}>
            <NavigationArrowUpward color="#466BB0" />
        </IconButton>
        <IconButton tooltip="往下移動"
            onClick={moveDown}>
            <NavigationArrowDownward color="#466BB0" />
        </IconButton>
    </CardActions> : null

    const insStr = expansion? name
        : name.slice(0, 13)+'...'
    return <Card expanded={expansion} onExpandChange={expand}>
        <CardHeader
            title={String(index)+'. '+insStr}
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
/*
//rendering
const repeatSeq = (repeat.from === repeat.to)?
    '#'+repeat.from: '#'+repeat.from+'~#'+repeat.to
const repeatContent = 'repeat '+repeatSeq+' for '
    +repeat.times+' times. Then, go to #'+then
const linkContent = isEditor?  <div>{link}</div>: null

//link button
<CardActions expandable={true}>
    <FlatButton label={link}
        icon={<AvMovie/>}
        onClick={(e) => {
            console.log('OPEN LINK', link)
            window.open(link)
        }}/>
</CardActions>
*/
