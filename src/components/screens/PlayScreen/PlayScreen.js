import React, { Component } from 'react'
import './PlayScreen.css';
import UIBlock from '../../UIBlock/UIBlock'
import QuizListItem from '../../QuizListItem/QuizListItem';
import UIButton from '../../UIButton/UIButton';
import { Spring } from 'react-spring/renderprops';
import RatingUI from '../../RatingUI/RatingUI';


export default class PlayScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedQuiz: null,
            highscores: null,
            userHighscores: null,
            quizRatings: null,
        }

    }

    componentDidMount = () => {
        this.fetchHighscores();
        this.fetchQuizRatings();
    }

    fetchHighscores = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            dataType: "json",
        };

        fetch(process.env.REACT_APP_API_URL + "/Scores", requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    highscores: data.sort((a, b) => parseInt(b.userScore) - parseInt(a.userScore)),
                    userHighscores: this.getUserHighscores(data, this.props.userId)
                });
            });
    }

    fetchQuizRatings = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            dataType: "json",
        };

        fetch(process.env.REACT_APP_API_URL + "/Ratings", requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    quizRatings: data
                });
            });
    }

    getUserHighscores = (data, userId) => {
        return data.filter(d => d.userID == userId);
    }

    getUserHighscoreForQuiz = quizId => {
        let highscore = null;

        if (this.state.userHighscores !== null) {
            let highscores = this.state.userHighscores.filter(highscore => highscore.quizID == quizId);

            if (highscores[0] !== undefined) highscore = highscores[0].userScore;
        }

        return highscore;
    }

    getHighscoresForQuiz = quizId => {
        return this.state.highscores.filter(highscore => highscore.quizID === quizId).slice(0, 5);
    }

    setSelectedQuiz = quiz => {
        this.setState({ selectedQuiz: quiz });

        this.fetchQuizRatings();
    }

    calculateAverageRating = quizId => {
        let totalRating = 0;

        let filteredList = this.state.quizRatings.filter(r => r.quizID === quizId);

        filteredList.map(r => totalRating += r.ratingScore);

        return parseInt(totalRating / filteredList.length);
    }

    render() {

        const { quizs } = this.props;
        const { selectedQuiz } = this.state;

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
                                        <div className="PlayScreen-Header-Text" style={{ flex: 4 }}>Name</div>
                                        <div className="PlayScreen-Header-Text" style={{ flex: 2, textAlign: 'center' }}>Creator</div>
                                        <div className="PlayScreen-Header-Text" style={{ flex: 2, textAlign: 'center' }}>Questions</div>
                                        <div className="PlayScreen-Header-Text" style={{ flex: 1, textAlign: 'center' }}>Highscore</div>
                                    </div>

                                    {quizs.map(quiz => {
                                        return <QuizListItem
                                            key={quiz.quizID}
                                            quiz={quiz}
                                            highscore={(this.getUserHighscoreForQuiz(quiz.quizID) !== null) ? this.getUserHighscoreForQuiz(quiz.quizID) : 0}
                                            getUserName={this.props.getUserName}
                                            setSelectedQuiz={this.setSelectedQuiz}
                                            selected={(this.state.selectedQuiz === quiz ? true : false)}
                                        />
                                    })}


                                </div>

                                <div className="PlayScreen-Quiz-Info">
                                    <div className="LogInScreen-LogIn-Text" style={{ marginBottom: 20 }}>{selectedQuiz ? selectedQuiz.quizName : "Select a quiz"}</div>

                                    <div style={{ width: '100%', height: '100%' }}>
                                        <div className="PlayScreen-Header-Text" style={{ fontSize: 20, textAlign: 'center' }}>Description:</div>
                                        <div className="PlayScreen-Quiz-Desc" style={{ height: 100, marginBottom: 5 }}>
                                            {selectedQuiz ? selectedQuiz.description : ""}
                                        </div>

                                        <div className="PlayScreen-Header-Text" style={{ fontSize: 20, textAlign: 'center' }}>Highscores:</div>
                                        <div className="PlayScreen-Quiz-Desc" style={{ height: 100, marginBottom: 5 }}>
                                            <table style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
                                                {(selectedQuiz !== null) ? this.getHighscoresForQuiz(selectedQuiz.quizID).map((highscore, i) =>
                                                    <tbody key={i}>
                                                        <tr>
                                                            <td>{this.props.getUserName(highscore.userID)}</td>
                                                            <td style={{ paddingLeft: 100, paddingRight: 100 }}>-</td>
                                                            <td>{highscore.userScore}</td>
                                                        </tr>
                                                    </tbody>
                                                ) : <thead></thead>}
                                            </table>
                                        </div>

                                        <div className="PlayScreen-Header-Text" style={{ fontSize: 20, textAlign: 'center' }}>Rating:</div>
                                        <RatingUI readOnly defaultValue={this.state.selectedQuiz !== null ? this.calculateAverageRating(this.state.selectedQuiz.quizID) : 0} />
                                    </div>

                                    {selectedQuiz &&
                                        <UIButton title={"Play!"} width={150} height={40} fontSize={32} onClick={() => this.props.startQuiz(selectedQuiz)} />
                                    }


                                </div>


                            </div>
                        </UIBlock>
                    </div>
                )}


            </Spring>
        )
    }



}
