import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { PrettyJson } from './pretty-json'

const Wrapper = styled.div`
    height: 600px;
    overflow-y: auto;
    @media (max-width: 800px) {
        width: 100%;
    }
`

const MainDisplay = ({ store: { capsules, display, launchPad } }) => (
        <Wrapper>
            {!display && (
                <p>
                    Please select capsules or a launch site
                </p>
            )}
            {display === 'CAPSULES' && <PrettyJson data={capsules} heading="Capsules" />}
            {display === 'LAUNCH_PAD' && <PrettyJson data={launchPad} heading="Launch Pad" />}
        </Wrapper>
)

const mapStateToProps = state => ({ store: state })

export default connect(mapStateToProps)(MainDisplay)
