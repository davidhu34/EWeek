import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import Instruction from './Instruction'

const Program = ({ owner, instructions }) => {
    const insList = instructions.map( (i, idx) =>
        <Instruction key={idx}
            index={idx+1}
            instruction={i}
            status="view" />
    )
    return <div>
        {insList}
    </div>
}



export default connect(
    state => {
        console.log(state)
        const { programs, instructions } = state
        const program = programs['1']
        return {
            owner: program.team,
            instructions: program.instructionList.map(
                id => instructions[id]
            )
        }
    },
)(Program)
