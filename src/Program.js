import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import Instruction from './Instruction'

const Program = (props) => {
    console.log(props)
    const { user, owner, instructions } = props
    const insList = instructions.map( (i, idx) =>
        <Instruction key={idx}
            index={idx+1}
            instruction={i}
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
)(Program)
