import React, { Component } from 'react'
import './NavBar.css';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';

export default class NavBar extends Component {
    render() {
        return (
            <AppBar>
                <div className="Container">
                    <Toolbar color="red">

                        {/* Logo */}
                        <Typography variant="h4" style={{ fontFamily: 'Permanent Marker', color: 'white' }}>
                            Gamebased Learning System
                        </Typography>

                        {/* About button */}
                        <div className="NavBar-End">
                        <div>
                                <IconButton color="inherit"
                                    target="_blank" href="https://web01.usn.no/~222027/"
                                >
                                    {/* <InfoIcon fontSize="large" /> */}
                                    About
                                </IconButton>
                            |
                            </div>

                            <div>
                                <IconButton color="inherit"
                                    target="_blank" href="https://createquizazure.azurewebsites.net/"
                                >
                                    {/* <InfoIcon fontSize="large" /> */}
                                    Create a quiz
                                </IconButton>
                            |
                            </div>

                            {/* User button */}
                            {this.props.user !== null ?
                                <div>
                                    {/* If logged in, show logout button */}
                                    <IconButton edge="end" color="inherit" onClick={() => this.props.logout()}>
                                        {/* <ExitToAppIcon fontSize="large" /> */}
                                        Log Out
                                    </IconButton>
                                </div>
                                :

                                (this.props.screen === "LogIn") ?
                                    <div>
                                        {/* If on login screen, show register button */}
                                        <IconButton edge="end" color="inherit" onClick={() => this.props.setScreen('Register')}>
                                            {/* <AccountCircleIcon fontSize="large" /> */}
                                        Register
                                    </IconButton>
                                    </div> :

                                    // Else show login button
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
