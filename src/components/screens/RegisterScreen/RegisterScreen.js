import React, { Component } from 'react'
import './RegisterScreen.css';
import UIBlock from '../../UIBlock/UIBlock'
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Spring } from 'react-spring/renderprops';
import UIButton from '../../UIButton/UIButton';

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            passwordStrength: '',
            passwordStrengthColor: 'red',
        };

    }

    handleSubmit = () => {

        // Check that there actually is a username and password too test
        if (this.state.username !== '' && this.state.password !== '') {

            // Check that the username is long enough
            if (this.state.username.length < 6) {
                this.setState({ errorMessage: 'Username is too short!\r\nMust be above 6 characters!' });
                return;
            }

            // Check that the password is long enough
            if (this.state.password.length < 6) {
                this.setState({ errorMessage: 'Password is too short!\r\nMust be above 6 characters!' });
                return;
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                dataType: "json",
                body: JSON.stringify({ Username: this.state.username, Password: this.state.password })
            };

            fetch(process.env.REACT_APP_API_URL + "/Users", requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.username !== undefined && data.userID !== undefined) {
                        this.succesful(data);
                    } else if (data.Message !== undefined) {
                        this.setState({ errorMessage: data.Message });
                    }
                });

        } else {
            this.setState({ errorMessage: 'Username or password is empty!' })
        }
    }

    // Register is successful, logs in the user
    succesful = userData => {
        this.props.login(userData.username, userData.userID);
    }

    // Checks the passwords strength
    CheckPasswordStrength = password => {

        //Regular Expressions
        var regex = new Array();
        regex.push("[A-Z]"); //For Uppercase Alphabet
        regex.push("[a-z]"); //For Lowercase Alphabet
        regex.push("[0-9]"); //For Numeric Digits
        regex.push("[$@$!%*#?&]"); //For Special Characters

        var passed = 0;

        //Validation for each Regular Expression
        for (var i = 0; i < regex.length; i++) {
            if ((new RegExp(regex[i])).test(password)) {
                passed++;
            }
        }

        //Validation for Length of Password
        if (passed > 2 && password.length > 8) {
            passed++;
        }

        // If too few characters, then return -1 for error message
        if (password.length < 7) passed = -1;

        //Display of Status
        var color = "";
        var passwordStrength = "";
        switch (passed) {
            case 0:
                break;
            case 1:
                passwordStrength = "Password is Weak.";
                color = "Red";
                break;
            case 2:
                passwordStrength = "Password is Good.";
                color = "gray";
                break;
            case 3:
                passwordStrength = "Password is Good.";
                color = "gray";
                break;
            case 4:
                passwordStrength = "Password is Strong.";
                color = "Green";
                break;
            case 5:
                passwordStrength = "Password is Very Strong.";
                color = "darkgreen";
                break;

            default:
                passwordStrength = "Too few characters!";
                color = "Black";
                break;
        }

        this.setState({ passwordStrength, passwordStrengthColor: color });
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
                            {/* Header */}
                            <div className="LogInScreen-LogIn-Text">Register</div>

                            <br />

                            <form onSubmit={this.handleSubmit}>
                                {/* Username */}
                                <div className="LogInScreen-Text">Username</div>
                                <TextField
                                    id="outlined-required"
                                    defaultValue=""
                                    variant="outlined"
                                    style={{ backgroundColor: 'white', borderRadius: 5, marginBottom: 5 }}
                                    onChange={e => this.setState({ username: e.target.value })}
                                />

                                {/* Password */}
                                <div className="LogInScreen-Text">Password</div>
                                <TextField
                                    id="outlined-required"
                                    defaultValue=""
                                    type="password"
                                    variant="outlined"
                                    style={{ backgroundColor: 'white', borderRadius: 5, marginBottom: 4 }}
                                    onChange={e => {
                                        this.setState({
                                            password: e.target.value
                                        });
                                        this.CheckPasswordStrength(e.target.value); // Checks the password strength
                                    }}
                                />
                                {/* Shows the password strength */}
                                {this.state.passwordStrength !== '' && <div className="LogInScreen-Text" style={{ color: this.state.passwordStrengthColor, textAlign: 'center' }}>{this.state.passwordStrength}</div>}

                                <br />

                                {/* Shows potential error message */}
                                {this.state.errorMessage !== '' && <div className="LogInScreen-Text" style={{ color: 'red', textAlign: 'center' }}>{this.state.errorMessage}</div>}

                                <br />

                                {/* Register button */}
                                <UIButton title={"Register"} fontSize={24} onClick={this.handleSubmit} />
                            </form>
                        </UIBlock>
                    </div>
                )}


            </Spring>
        )
    }


}
