import React, { Component } from 'react'
import './QuizDoneScreen.css';
import { Spring } from 'react-spring/renderprops';
import UIBlock from '../../UIBlock/UIBlock';
import UIButton from '../../UIButton/UIButton';
import RatingUI from '../../RatingUI/RatingUI';

export default class QuizDoneScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            rating: 0,
        }
    }

    setRating = rating => {
        this.setState({ rating });
    }

    submitRating = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            dataType: "json",
            body: JSON.stringify({ UserID: this.props.userId, QuizID: this.props.quizId, RatingScore: this.state.rating })
        };

        fetch(process.env.REACT_APP_API_URL + "/Ratings/", requestOptions)
            .then(response => response.json())
            .then(data => {

            });
    }

    render() {

        const { points, rightAnswers, totalQuestions, newHighScore } = this.props;

        return (
            <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                config={{ delay: 300 }}
            >

                { props => (
                    <div style={props}>
                        <UIBlock>
                            <div className="QuizScreen-Main">
                                {/* Header */}
                                <div className="QuizDoneScreen-Title-Text" style={{ marginBottom: 20 }}>Quiz done!</div>

                                {/* Points Text */}
                                <div className="QuizDoneScreen-Line-Text" style={{ marginBottom: 20 }}>Points: {points}</div>

                                {/* Right answers text */}
                                <div className="QuizDoneScreen-Line-Text" style={{ marginBottom: newHighScore ? 0 : 100 }}>Right answers: {rightAnswers}/{totalQuestions}</div>

                                {/* Shows new high score text if there is a new high score */}
                                {newHighScore && <div className="QuizDoneScreen-Record-Text" style={{ marginBottom: 20 }}>New high score!</div>}

                                {/* Rating */}
                                <div style={{ flex: 1 }}>
                                    <div className="QuizDoneScreen-Line-Text">What did you think of the quiz?</div>
                                    <RatingUI setRating={this.setRating} defaultValue={3} />
                                </div>

                                {/* Play new quiz button */}
                                <div style={{ position: 'absolute', bottom: 5 }}>
                                    <UIButton
                                        title={"Play new quiz!"}
                                        width={'20vw'}
                                        height={60}
                                        marginWidth={0}
                                        marginHeight={0}
                                        autoAdjustFontSize
                                        onClick={() => {
                                            if (this.state.rating !== 0) this.submitRating(); // Submits the rating, if one was inputted
                                            this.props.setScreen('Play')                      // Return to PlayScreen
                                        }}
                                    />
                                </div>

                            </div>

                        </UIBlock>
                    </div>
                )}


            </Spring>
        )
    }
}

