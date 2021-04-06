import React, { Component } from 'react'
import './App.css';
import NavBar from './components/NavBar/NavBar';
import LogInScreen from './components/screens/LogInScreen/LogInScreen';
import PlayScreen from './components/screens/PlayScreen/PlayScreen';
import QuizDoneScreen from './components/screens/QuizDone/QuizDoneScreen';
import QuizScreen from './components/screens/QuizScreen/QuizScreen';
import RegisterScreen from './components/screens/RegisterScreen/RegisterScreen';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      screen: 'Quiz',
      user: null,
      quizs: [],
      selectedQuiz: null,
      users: [],
    };
  }

  componentDidMount() {
    this.fetchQuiz();
    this.fetchUsers();
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

  login = (username, userId) => {
    this.setUser(username, userId);
    this.setScreen('Play');
  }

  logout = () => {
    this.setState({ user: null });
    this.setScreen('LogIn');
  }

  fetchQuiz = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      dataType: "json",
    };

    fetch(process.env.REACT_APP_API_URL + "/Quizs", requestOptions)
      .then(response => response.json())
      .then(data => {
        this.setState({ quizs: data });
      });
  }

  fetchUsers = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      dataType: "json",
    };

    fetch(process.env.REACT_APP_API_URL + "/Users/GetUserIdList", requestOptions)
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data });
      });
  }

  getUserName = id => {
    let userList = this.state.users;
    let user = userList.filter(u => u.userID == id)[0];

    return (user !== undefined) ? user.username : null;

  }

  startQuiz = quiz => {
    this.setState({
      screen: 'Quiz',
      selectedQuiz: quiz
    });
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
            <PlayScreen
              quizs={this.state.quizs}
              users={this.state.users}
              getUserName={this.getUserName}
              startQuiz={this.startQuiz}
            />
          }

          {this.state.screen === 'Quiz' && this.state.quizs.length > 0 &&
            <QuizScreen
              quiz={this.state.quizs[0]}
              setScreen={this.setScreen}
            />
          }

          {this.state.screen === 'QuizDone' &&
            < QuizDoneScreen />
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
