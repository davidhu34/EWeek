import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import Instruction from './Instruction'

import { creationDialog, editDialog, deleteDialog, changeOrder } from './actions'

const Program = ({ user, owner, instructions,
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
    return <div>
        {insList}
    </div>
}

export default connect(
    state => {
        console.log(state)
        const { programs, instructions, view, user } = state
        const program = programs['1']
        return {
            user: user.team,
            owner: program.team,
            instructions: program.instructionList.map(
                id => instructions[id]
            )
        }
    },
    dispatch => {
        return {
            newIns: () => (e) => dispatch(creationDialog),
            editIns: (idx) => (e) => dispatch(editDialog(idx)),
            deleteIns: (idx) => (e) => dispatch(deleteDialog(idx)),
            moveIns: (idx, up) => (e) => dispatch(changeOrder(idx, up))
        }
    }
)(Program)
