import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Add } from './actions'

import FlatButton from 'material-ui/FlatButton'

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
    const ui = (user.profile)? (
        (user.viewing)? <div>
            <Program />
            <Modal />
        </div>: <TeamList />
    ): <Login />
    const Nav = <div>
        <FlatButton label="Login"
            icon={user.profile === null?
                <ActionLockOutline />
                :<ActionLockOpen />}
            disabled={user.login === null} />
        <FlatButton label="Teams"
            icon={<SocialGroup />}
            disabled={user.profile === null}
            onClick={reselectTeam}/>
        <FlatButton label="Program"
            icon={<ActionFormatListNumbered />}
            disabled={user.viewing === null} />
        {(user.profile)?
            (user.viewing === user.profile.team)?
                <FlatButton label="Save Changes"
                    icon={<ContentSave />}
                    disabled={user.saving}
                    onClick={saveChanges}
                />: null
            : null
        }
    </div>
    return <div>
        {Nav}
        <br/>
        {ui}
    </div>
}


export default connect(
    state => ({ user: state.user }),
    dispatch => ({
        reselectTeam: (e) => dispatch( reselectTeam() ),
        saveChanges: (e) => dispatch( saveChanges ),
    })
)(App)
