import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import Instruction from './Instruction'
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add'

import { creationDialog, editDialog, deleteDialog, changeOrder, expand,
    startMove, endMove } from './actions'

const Program = ({ user, moving,saving, expanding, prevOrder, owner, program, order, newIndex, instructions,
    newIns, editIns, deleteIns, moveIns, expand,
    startMove, endMove, finishMove, cancelMove
}) => {
    const insList = instructions.map( (i, idx) =>
        <Instruction key={idx}
            index={idx+1}
            instruction={i}
            deleteIns={deleteIns(idx, i)}
            editIns={editIns(idx, i)}
            startMove={startMove(idx, order)}
            finishMove={endMove(idx, order, true)}
            cancelMove={endMove(idx, prevOrder, false)}
            isMoving={moving === idx}
            isSaving={saving}
            moveUp={moveIns(program, idx, true)}
            moveDown={moveIns(program, idx, false)}
            expanded={expanding[idx]}
            expand={moving? ((e) => {}):expand(program, idx)}
            isEditor={owner === user} />
    )
    if (owner === user) insList.push(
        <FlatButton key="new" label="new"
            style={{color: "#466BB0"}}
            fullWidth={true}
            icon={<ActionNoteAdd />}
            onClick={newIns(newIndex)}/>
    )
    return <div>
        {insList}
    </div>
}

export default connect(
    state => {
        const { programs, user } = state
        const program = programs[user.viewing]
        return {
            user: user.profile.team,
            moving: user.moving,
            saving: user.saving,
            expanding: user.expanding,
            prevOrder: user.prevOrder,
            owner: program.team,
            program: program.id,
            order: program.instructionOrder,
            newIndex: program.instructionOrder.length,
            instructions: program.instructionOrder.map(
                id => program.instructions[id]
            )
        }
    },
    dispatch => ({
            startMove: (p, idx) => (e) => dispatch(startMove(p, idx)),
            endMove: (idx, o, finish) => (e) => dispatch(endMove(idx, o, finish)),
            newIns: (idx) => (e) => dispatch(creationDialog(idx)),
            editIns: (idx, i) => (e) => dispatch(editDialog(idx, i)),
            deleteIns: (idx, i) => (e) => dispatch(deleteDialog(idx ,i)),
            moveIns: (p, idx, up) => (e) => dispatch(changeOrder(p, idx, up)),
            expand: (p, idx) => (willExpand) => { dispatch(expand(p, idx, willExpand)) }
        })
)(Program)
