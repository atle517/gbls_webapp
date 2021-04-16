import React, { Component } from 'react'
import './LogInScreen.css';
import UIBlock from '../../UIBlock/UIBlock'
import { TextField } from '@material-ui/core';
import { Spring } from 'react-spring/renderprops';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import UIButton from '../../UIButton/UIButton';

export default class LogInScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        };

    }

    handleSubmit = () => {

        if (this.state.username !== '' && this.state.password !== '') {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                dataType: "json",
                body: JSON.stringify({ Username: this.state.username, Password: this.state.password })
            };

            fetch(process.env.REACT_APP_API_URL + "/Users/Auth", requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.Username !== undefined && data.Id !== undefined) {
                        this.succesful(data);
                    } else if (data.Message !== undefined) {
                        this.setState({ errorMessage: data.Message });
                    }
                });

        } else {
            this.setState({ errorMessage: 'Username or password is empty!' })
        }

    }

    succesful = userData => {
        this.props.login(userData.username, userData.Id);
    }

    render() {
        return (
            <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{ delay: 300 }}
            >

                { props => (
                    <div style={props}>
                        <UIBlock>
                            <div className="LogInScreen-LogIn-Text">Log In</div>

                            <br />

                            <form onSubmit={this.handleSubmit}>
                                <div className="LogInScreen-Text">Username</div>
                                <TextField
                                    id="outlined-required"
                                    defaultValue=""
                                    variant="outlined"
                                    style={{ backgroundColor: 'white', borderRadius: 5, marginBottom: 5 }}
                                    onChange={e => this.setState({ username: e.target.value })}
                                />


                                <div className="LogInScreen-Text">Password</div>
                                <TextField
                                    id="outlined-required"
                                    defaultValue=""
                                    type="password"
                                    variant="outlined"
                                    style={{ backgroundColor: 'white', borderRadius: 5 }}
                                    onChange={e => this.setState({ password: e.target.value })}
                                />

                                <FormControlLabel
                                    value="start"
                                    control={<Checkbox color="primary" />}
                                    label="Remember Me"
                                    labelPlacement="end"

                                    style={{ marginTop: 3, marginBottom: 10 }}
                                />

                                {this.state.errorMessage !== '' && <div className="LogInScreen-Text" style={{ color: 'red', textAlign: 'center' }}>{this.state.errorMessage}<br /><br /></div>}

                                {/* <Button type="submit" variant="contained" disableElevation color="primary" style={{ backgroundColor: '#3396FF' }}>
                                    Log In
                                </Button> */}

                                <UIButton title={"Log In"} fontSize={24} onClick={this.handleSubmit} />
                            </form>
                        </UIBlock>
                    </div>
                )}


            </Spring>
        )
    }


}
