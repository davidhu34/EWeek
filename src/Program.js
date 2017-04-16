import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import Instruction from './Instruction'
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add'

import { creationDialog, editDialog, deleteDialog, changeOrder } from './actions'

const Program = ({ user, owner, program, instructions,
    newIns, editIns, deleteIns, moveIns
}) => {
    const insList = instructions.map( (i, idx) =>
        <Instruction key={idx}
            index={idx+1}
            instruction={i}
            deleteIns={deleteIns(idx)}
            editIns={editIns(idx)}
            moveUp={moveIns(idx, true)}
            moveDown={moveIns(idx, false)}
            isEditor={owner === user} />
    )
    if (owner === user) insList.push(
        <FlatButton label="new"
            fullWidth={true}
            icon={<ActionNoteAdd />}
            onClick={newIns()}/>
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
            instructions: program.instructionOrder.map(
                id => program.instructions[id]
            )
        }
    },
    dispatch => {
        return {
            newIns: () => (e) => dispatch(creationDialog),
            editIns: (idx) => (e) => dispatch(editDialog(idx)),
            deleteIns: (idx) => (e) => dispatch(deleteDialog(idx)),
            moveIns: (p, idx, up) => (e) => dispatch(changeOrder(idx, up))
        }
    }
)(Program)
