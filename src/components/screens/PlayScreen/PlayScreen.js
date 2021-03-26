import React, { Component } from 'react'
import './PlayScreen.css';
import UIBlock from '../../UIBlock/UIBlock'
import QuizListItem from '../../QuizListItem/QuizListItem';
import UIButton from '../../UIButton/UIButton';
import { Spring } from 'react-spring/renderprops';


export default class PlayScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            quizs: [],
            users: [],
            selectedQuiz: null,
        }

    }

    componentDidMount() {
        this.fetchQuiz();
        this.fetchUsers();
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

    setSelectedQuiz = quiz => {
        this.setState({ selectedQuiz: quiz });
    }



    render() {

        const { quizs, selectedQuiz } = this.state;

        return (
            <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{ delay: 300 }}
            >

                { props => (
                    <div style={props}>
                        <UIBlock>
                            <div className="PlayScreen-Main">
                                <div className="PlayScreen-Quiz-List">
                                    <div className="LogInScreen-LogIn-Text" style={{ marginBottom: 20 }}>Quizs</div>

                                    {/* Quiz Table */}
                                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                        <div style={{ flex: 4 }}>Name</div>
                                        <div style={{ flex: 2, textAlign: 'center' }}>Creator</div>
                                        <div style={{ flex: 2, textAlign: 'center' }}>Questions</div>
                                        <div style={{ flex: 1, textAlign: 'center' }}>Highscore</div>
                                    </div>

                                    {quizs.map(quiz => {
                                        return <QuizListItem
                                            key={quiz.quizID}
                                            quiz={quiz}
                                            highscore={10}
                                            getUserName={this.getUserName}
                                            setSelectedQuiz={this.setSelectedQuiz}
                                            selected={(this.state.selectedQuiz === quiz ? true : false)}
                                        />
                                    })}


                                </div>

                                <div className="PlayScreen-Quiz-Info">
                                    <div className="LogInScreen-LogIn-Text" style={{ marginBottom: 20 }}>{selectedQuiz ? selectedQuiz.quizName : "Select a quiz"}</div>

                                    <div style={{ width: '100%', height: '100%' }}>
                                        Description:
                             <div className="PlayScreen-Quiz-Desc" style={{ height: 100, marginBottom: 5 }}>
                                            {selectedQuiz ? selectedQuiz.description : ""}
                                        </div>

                            Top scores:
                            <div className="PlayScreen-Quiz-Desc" style={{ height: 100, marginBottom: 5 }}>
                                            {selectedQuiz ? selectedQuiz.questions.length : ""}
                                        </div>

                            Rating:
                            <div className="PlayScreen-Quiz-Desc" style={{ height: 60, marginBottom: 5 }}>

                                        </div>
                                    </div>

                                    <UIButton title={"Play!"} width={150} height={40} fontSize={32} />



                                </div>


                            </div>
                        </UIBlock>
                    </div>
                )}


            </Spring>
        )
    }
}
