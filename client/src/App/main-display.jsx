import React from 'react';
import { connect } from 'react-redux';

const MainDisplay = ({ store: { capsules, display, launchPad } }) => (
        <div className="main-display outer-border">
            {!display && (
                <p>
                    select capsules or a launch site
                </p>
            )}
            {display === 'CAPSULES' && capsules.map((capsule, i) => {
                const {
                    capsule_serial,
                    type,
                    details,
                    landings,
                    missions,
                    original_launch,
                    reuse_count,
                    status
                } = capsule

                return (
                    <div key={capsule_serial}>
                        <p>
                            Type: {type}
                        </p>

                        <p>
                            Serial: {capsule_serial}
                        </p>

                        <p>
                            Details: {details}
                        </p>

                        <p>
                            No. of Landings: {landings}
                        </p>

                        <div>
                            <p>Missions:</p>
                            {missions
                                ? (
                                    missions.map(({ flight, name }) => (
                                        <div key={name}>
                                            <p>
                                                Name: {name}
                                                <br/>
                                                Flight: {flight}
                                                <br/>
                                            </p>
                                        </div>
                                    )
                                ))
                                : (
                                    <p>N/A</p>
                                )
                            }
                        </div>

                        <p>
                            No. of Landings: {landings}
                        </p>

                        <p>
                            First Launch Date: {original_launch}
                        </p>

                        <p>
                            Times Re-used: {reuse_count}
                        </p>

                        <p>
                            Status: {status}
                        </p>
                    </div>
                )
            })}
            {display === 'LAUNCH_PADS' && console.log('launchPad', launchPad)}
        </div>
)

const mapStateToProps = state => ({ store: state })

export default connect(mapStateToProps)(MainDisplay)
