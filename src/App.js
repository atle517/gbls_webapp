import React, { Component } from 'react'
import './App.css';
import NavBar from './components/NavBar/NavBar';
import LogInScreen from './components/screens/LogInScreen/LogInScreen';
import PlayScreen from './components/screens/PlayScreen/PlayScreen';
import RegisterScreen from './components/screens/RegisterScreen/RegisterScreen';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      screen: 'Play',
      user: null,
    };
  }

  setScreen = screen => {
    this.setState({ screen });
  }

  setUser = (username, userId) => {
    this.setState({
      user: {
        username,
        userId
      }
    });
  }

  login = (username, userId) =>{
    this.setUser(username, userId);
    this.setScreen('Play');
  }

  logout = () => {
    this.setState({ user: null });
    this.setScreen('LogIn');
  }

  render() {
    return (
      <div className="App">
        {/* NavBar at top of the screen */}
        <NavBar
          screen={this.state.screen}
          user={this.state.user}
          setScreen={this.setScreen}
          logout={this.logout}
        />

        <div className="screen">

          {/* PlayScreen */}
          {this.state.screen === 'Play' &&
            <PlayScreen />
          }

          {/* LogInScreen */}
          {this.state.screen === 'LogIn' &&
            <LogInScreen login={this.login} />
          }

          {/* RegisterScreen */}
          {this.state.screen === 'Register' &&
            <RegisterScreen login={this.login} />
          }

        </div>

      </div>
    );
  }
}

export default App;
