import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { apiUrl } from '../constants'

const onClickCapsules = (e, onUpdateCapsules) => {
    e.preventDefault()
    axios.get(`${apiUrl}/capsules`)
        .then(({ data: { result } }) => {
            onUpdateCapsules(result)
        })
}

const Capsules = ({ onUpdateCapsules }) => (
    <button onClick={e => onClickCapsules(e, onUpdateCapsules)}>
        Capsules
    </button>
)

const mapDispatchToProps = dispatch => {
    return {
        onUpdateCapsules: capsules => {
            dispatch({ type: 'UPDATE_CAPSULES', capsules })
        }
    }
}

export default connect(null, mapDispatchToProps)(Capsules)
