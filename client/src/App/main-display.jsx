import React from 'react';
import { connect } from 'react-redux';
import { PrettyJson } from './pretty-json'

const MainDisplay = ({ store: { capsules, display, launchPad } }) => (
        <div className="main-display outer-border">
            {!display && (
                <p>
                    Please select capsules or a launch site
                </p>
            )}
            {display === 'CAPSULES' && <PrettyJson data={capsules} heading="Capsules" />}
            {display === 'LAUNCH_PAD' && <PrettyJson data={launchPad} heading="Launch Pad" />}
        </div>
)

const mapStateToProps = state => ({ store: state })

export default connect(mapStateToProps)(MainDisplay)
