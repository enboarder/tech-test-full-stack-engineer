import React from 'react';
import styled from 'styled-components';

const Heading = styled.div`
    padding: 5px 10px;
    color: #ffc600
`;

const Json = styled.div`
    padding: 10px 30px;
    pre {
        white-space: pre-wrap;
    }
`;

export const PrettyJson = ({ data, heading }) => (
    <>
        <Heading>
            <strong>{heading}</strong>
        </Heading>
        <Json>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </Json>
    </>
);
