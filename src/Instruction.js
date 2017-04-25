import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'

import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionSwapVert from 'material-ui/svg-icons/action/swap-vert'
import ActionDone from 'material-ui/svg-icons/action/done'
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward'
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward'
import AvMovie from 'material-ui/svg-icons/av/movie'
import CircularProgress from 'material-ui/CircularProgress'

const Instruction = ({ index, instruction, isEditor, isMoving, isSaving,
    editIns, deleteIns, expanded, expand, startMove,
    moveUp, moveDown, finishMove, cancelMove
}) => {
    console.log(finishMove, cancelMove)
    const { name, type, content, repeat, then, link } = instruction
    const actionButtons = isEditor? isMoving? isSaving? 
        <CircularProgress color="#466BB0"/>: <CardActions expandable={true}>
        <IconButton tooltip="往上移動" style={{color: "#466BB0"}}
            onClick={moveUp}>
            <NavigationArrowUpward color="#466BB0" />
        </IconButton>
        <IconButton tooltip="往下移動"
            onClick={moveDown}>
            <NavigationArrowDownward color="#466BB0" />
        </IconButton>
        <FlatButton label="完成" style={{color: "#466BB0"}}
            icon={<ActionDone/>}
            onClick={finishMove}/>/>
        <FlatButton label="取消" style={{color: "#466BB0"}}
            onClick={cancelMove}/>

    </CardActions>: <CardActions expandable={true}>
        <FlatButton label="編輯" style={{color: "#466BB0"}}
            icon={<EditorModeEdit/>}
            onClick={editIns}/>/>
        <FlatButton label="刪除" style={{color: "#466BB0"}}
            icon={<ActionDelete/>}
            onClick={deleteIns}/>
        <FlatButton label="移動順序" style={{color: "#466BB0"}}
            icon={<ActionSwapVert/>}
            onClick={startMove}/>
    </CardActions> : null

    const insStr = expanded? name
        : name.slice(0, 13)+'...'
    return <Card expanded={expanded} onExpandChange={expand}>
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
