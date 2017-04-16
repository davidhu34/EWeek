import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import Instruction from './Instruction'
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add'

import { creationDialog, editDialog, deleteDialog, changeOrder, expand } from './actions'

const Program = ({ user, owner, program, newIndex, instructions,
    newIns, editIns, deleteIns, moveIns, expand
}) => {
    const insList = instructions.map( (i, idx) =>
        <Instruction key={idx}
            index={idx+1}
            instruction={i}
            deleteIns={deleteIns(idx, i)}
            editIns={editIns(idx, i)}
            moveUp={moveIns(program, idx, true)}
            moveDown={moveIns(program, idx, false)}
            expand={expand(program, i)}
            isEditor={owner === user} />
    )
    if (owner === user) insList.push(
        <FlatButton label="new"
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
            owner: program.team,
            program: program.id,
            newIndex: program.instructionOrder.length,
            instructions: program.instructionOrder.map(
                id => program.instructions[id]
            )
        }
    },
    dispatch => {
        return {
            newIns: (idx) => (e) => dispatch(creationDialog(idx)),
            editIns: (idx, i) => (e) => dispatch(editDialog(idx, i)),
            deleteIns: (idx, i) => (e) => dispatch(deleteDialog(idx ,i)),
            moveIns: (p, idx, up) => (e) => dispatch(changeOrder(p, idx, up)),
            expand: (p, ins) => (willExpand) => { dispatch(expand(p, ins, willExpand)) }
        }
    }
)(Program)
