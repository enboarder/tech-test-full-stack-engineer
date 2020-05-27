import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { apiUrl } from '../constants'

const onClickLaunchPad = (e, onUpdateLaunchPad, input) => {
    e.preventDefault()

    axios.get(`${host}/landpads/${input}`)
        .then(({ data: { result } }) => {
            onUpdateLaunchPad(JSON.parse(result))
        })
}

const LandingPads = ({ onUpdateLaunchPad }) => {
    const [input, setInput] = useState('')

    const handleInputChange = e => setInput(e.currentTarget.value)

    return (
        <div className="outer-border">
            <form onSubmit={e => onClickLaunchPad(e, onUpdateLaunchPad, input)}>
                <button>
                    Landing Pad
                </button>

                <input type="text" value={input} onChange={handleInputChange} />
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateLaunchPad: launchPad => {
            dispatch({ type: 'UPDATE_LAUNCH_PAD', launchPad })
        }
    }
}

export default connect(null, mapDispatchToProps)(LandingPads)
