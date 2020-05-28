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
    display: flex;
    @media (max-width: 800px) {
        flex-direction: column
    }
    @media (min-width: 800px) {
        flex-direction: column
        justify-content: space-between;
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
        <Form onSubmit={e => onClickLaunchPad(e, onUpdateLaunchPad, input)}>
            <input type="text" value={input} onChange={handleInputChange} />

            <button>
                Landing Pad
            </button>

        </Form>
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
