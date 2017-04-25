import React, { Component } from 'react';
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'

import { selectProgram } from './actions'

const TeamList = ({ programs, selectProgram }) => {
    const buttons = programs.map( p =>
        <FlatButton label={p.team}
            style={{color: "#466BB0"}}
            fullWidth={true}
            onClick={selectProgram(p)}
        />
    )
    return <div>
        <FlatButton label="選擇欲瀏覽指令的隊伍"
            fullWidth={true}
            disabled={true} />
        {buttons}
    </div>
}


export default connect(
    state => ({
        programs: Object.keys(state.programs).map(
            k => state.programs[k]
        )
    }),
    dispatch => ({
        selectProgram: (p) => (e) => dispatch(selectProgram(p))
    })
)(TeamList)
