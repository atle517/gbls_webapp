import React, { Component } from 'react'
import './NavBar.css';
import { AppBar, IconButton, Toolbar, Typography, Button } from '@material-ui/core';

export default class NavBar extends Component {
    render() {
        return (
            <AppBar>
                <div className="Container">
                    <Toolbar color="red">

                        <Typography variant="h4" style={{ fontFamily: 'Permanent Marker', color: 'white' }}>
                            Gamebased Learning System
                        </Typography>

                        <div className="NavBar-End">
                            {/* {this.props.screen === 'Play' && */}
                                {/* <div> */}
                                    {/* <IconButton color="inherit"> */}
                                        {/* <PlayArrowIcon fontSize="large" /> */}
                                        {/* Play */}
                                    {/* </IconButton> */}

                            {/* | */}
                            {/* </div>} */}

                            <div>
                                <IconButton color="inherit">
                                    {/* <InfoIcon fontSize="large" /> */}
                                    About
                                </IconButton>
                            |
                            </div>

                            {this.props.user !== null ?
                                <div>
                                    <IconButton edge="end" color="inherit" onClick={() => this.props.logout()}>
                                        {/* <ExitToAppIcon fontSize="large" /> */}
                                        Log Out
                                    </IconButton>
                                </div>
                                :

                                (this.props.screen === "LogIn") ?
                                
                                <div>
                                    <IconButton edge="end" color="inherit" onClick={() => this.props.setScreen('Register')}>
                                        {/* <AccountCircleIcon fontSize="large" /> */}
                                        Register
                                    </IconButton>
                                </div>:



                                <div>
                                    <IconButton edge="end" color="inherit" onClick={() => this.props.setScreen('LogIn')}>
                                        {/* <AccountCircleIcon fontSize="large" /> */}
                                        Log In
                                    </IconButton>
                                </div>
                            }

                        </div>
                    </Toolbar>
                </div>
            </AppBar >
        )


    }
}
