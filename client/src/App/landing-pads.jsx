import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

import { apiUrl } from '../constants'

const onClickLaunchPad = (e, onUpdateLaunchPad, input) => {
    e.preventDefault()

    axios.get(`${apiUrl}/landpads/${input}`)
        .then(({ data: { result } }) => {
            onUpdateLaunchPad(result)
        })
}

const validate = (value) => {
    let isValid = true

    if (value.length > 14) {
        isValid = false
    }

    const forbiddenChars = ['#', '$', '%', '&', ' ']
    forbiddenChars.forEach(char => {
        if(value.includes(char)) {
            isValid = false
        }
    })

    return isValid
}

const Form = styled.form`
    button {
        margin-right: 10px;
    }

    input {
        margin-right: 10px;
    }
`

const LandingPads = ({ onUpdateLaunchPad }) => {
    const [input, setInput] = useState('')
    const [valid, setValid] = useState(true)

    const handleInputChange = e => {
        const { currentTarget: { value } } = e

        const isValid = validate(value)

        if(isValid) {
            setInput(value)
            if(!valid) {
                setValid(true)
            }
        } else {
            if(valid) {
                setValid(false)
            }
        }
    }

    return (
        <div className="outer-border">
            <Form onSubmit={e => onClickLaunchPad(e, onUpdateLaunchPad, input)}>
                <button>
                    Landing Pad
                </button>

                <input type="text" value={input} onChange={handleInputChange} />
                {!valid && (<label>Please enter a valid value</label>)}
            </Form>
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
