import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Add } from './actions'

import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'

import ActionLockOpen from 'material-ui/svg-icons/action/lock-open'
import ActionLockOutline from 'material-ui/svg-icons/action/lock-outline'
import SocialGroup from 'material-ui/svg-icons/social/group'
import ActionFormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered'
import ContentSave from 'material-ui/svg-icons/content/save'

import Login from './Login'
import TeamList from './TeamList'
import Program from './Program'
import Modal from './Modal'

import { reselectTeam, saveChanges } from './actions'

const App = ({ user, reselectTeam, saveChanges }) => {

    const Nav = <div>
        <FlatButton label={user.profile === null?
                "登入": user.profile.team
            }
            icon={user.profile === null?
                <ActionLockOutline />
                :<ActionLockOpen />}
            disabled={user.login === null} />
        <FlatButton label="隊伍"
            icon={<SocialGroup />}
            disabled={user.profile === null}
            onClick={reselectTeam}/>
        <FlatButton label="指令"
            icon={<ActionFormatListNumbered />}
            disabled={user.viewing === null} />
    </div>
    const ui = (user.profile)? (
        (user.viewing)? <div>
            <Program />
            <Modal />
        </div>: <TeamList />
    ): <Login />
    return <div>
        <AppBar title="EWeek game"
            showMenuIconButton={false}
            style={{
                backgroundColor: "#466BB0",
                height: 50
            }}
            iconElementRight={
                <img src="ibm.png" height="22px" width="58px"/>
            }
            iconStyleRight={{
                paddingTop: 13
            }}
        />
        <div style={{margin: '8px'}}>
            {Nav}
            <br/>
            {ui}
        </div>
    </div>
}


export default connect(
    state => ({ user: state.user }),
    dispatch => ({
        reselectTeam: (e) => dispatch( reselectTeam() ),
        saveChanges: (e) => dispatch( saveChanges ),
    })
)(App)
/*
//save changes
{(user.profile)?
    (user.viewing === user.profile.id)?
        <FlatButton label="儲存變更"
            icon={<ContentSave />}
            disabled={user.saving}
            onClick={saveChanges}
        />: null
    : null
}
*/
