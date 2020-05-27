import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
    backgroundColor: #1f4662;
    color: #fff;
    fontSize: 12px
`

const Heading = styled.div`
    backgroundColor: #193549;
    padding: 5px 10px;
    fontFamily: monospace;
    color: #ffc600
`

const Json = styled.div`
    display: block;
    padding: 10px 30px;
    margin: 0;
    overflow: scroll
`

export const PrettyJson = ({ data, heading }) => (
    <Wrapper>
        <Heading>
            <strong>{heading}</strong>
        </Heading>
        <Json>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </Json>
    </Wrapper>
)
