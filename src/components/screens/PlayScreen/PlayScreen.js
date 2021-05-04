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

    // On component mount, fetch highscores and ratings for all quizes
    componentDidMount = () => {
        this.fetchHighscores();
        this.fetchQuizRatings();
    }

    // Fetches all highscores
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
                    highscores: data.sort((a, b) => parseInt(b.userScore) - parseInt(a.userScore)), // Sorts all the highscores desc
                    userHighscores: this.getUserHighscores(data, this.props.userId)                 // Gets the logged in users high scores
                });
            });
    }

    // Fetches all ratings
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

    // Returns a list with the logged in users highscores only
    getUserHighscores = (data, userId) => {
        return data.filter(d => d.userID == userId);
    }

    // Returns the logged in users specific highscore for that quiz
    getUserHighscoreForQuiz = quizId => {
        let highscore = null;

        if (this.state.userHighscores !== null) {
            let highscores = this.state.userHighscores.filter(highscore => highscore.quizID == quizId);

            if (highscores[0] !== undefined) highscore = highscores[0].userScore;
        }

        return highscore;
    }

    // Returns a list of top 5 highscores for a quiz
    getHighscoresForQuiz = quizId => {
        return this.state.highscores.filter(highscore => highscore.quizID === quizId).slice(0, 5);
    }

    // Sets the selected quiz
    setSelectedQuiz = quiz => {
        this.setState({ selectedQuiz: quiz });

        // Fetches the ratings for the selected quiz. This is done again for updating
        this.fetchQuizRatings();
    }

    // Calculates the average rating for a quiz
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
                                    {/* Header */}
                                    <div className="LogInScreen-LogIn-Text" style={{ marginBottom: 20 }}>Quizs</div>

                                    {/* Quiz Table */}
                                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                        <div className="PlayScreen-Header-Text" style={{ flex: 4 }}>Name</div>
                                        <div className="PlayScreen-Header-Text" style={{ flex: 2, textAlign: 'center' }}>Creator</div>
                                        <div className="PlayScreen-Header-Text" style={{ flex: 2, textAlign: 'center' }}>Questions</div>
                                        <div className="PlayScreen-Header-Text" style={{ flex: 1, textAlign: 'center' }}>Highscore</div>
                                    </div>

                                    {/* Shows all quizes */}
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
                                    {/* Header */}
                                    <div className="LogInScreen-LogIn-Text" style={{ marginBottom: 20 }}>{selectedQuiz ? selectedQuiz.quizName : "Select a quiz"}</div>

                                    <div style={{ width: '100%', height: '100%' }}>
                                        {/* Description */}
                                        <div className="PlayScreen-Header-Text" style={{ fontSize: 20, textAlign: 'center' }}>Description:</div>
                                        <div className="PlayScreen-Quiz-Desc" style={{ height: 100, marginBottom: 5 }}>
                                            {selectedQuiz ? selectedQuiz.description : ""}
                                        </div>

                                        {/* Highscores */}
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

                                        {/* Rating */}
                                        <div className="PlayScreen-Header-Text" style={{ fontSize: 20, textAlign: 'center' }}>Rating:</div>
                                        <RatingUI readOnly defaultValue={this.state.selectedQuiz !== null ? this.calculateAverageRating(this.state.selectedQuiz.quizID) : 0} />
                                    </div>

                                    {/* Play Button */}
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
