import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import Instruction from './Instruction'
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add'

import { creationDialog, editDialog, deleteDialog, changeOrder } from './actions'

const Program = ({ user, owner, program, newIndex, instructions,
    newIns, editIns, deleteIns, moveIns
}) => {
    console.log(instructions)
    const insList = instructions.map( (i, idx) =>
        <Instruction key={idx}
            index={idx+1}
            instruction={i}
            deleteIns={deleteIns(idx)}
            editIns={editIns(idx, i)}
            moveUp={moveIns(program, idx, true)}
            moveDown={moveIns(program, idx, false)}
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
        console.log(state)
        const { programs, user } = state
        const program = programs[user.viewing]
        return {
            user: user.team,
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
            deleteIns: (idx) => (e) => dispatch(deleteDialog(idx)),
            moveIns: (p, idx, up) => (e) => dispatch(changeOrder(p, idx, up))
        }
    }
)(Program)
