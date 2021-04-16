import React, { Component } from 'react'
import './QuizDoneScreen.css';
import { Spring } from 'react-spring/renderprops';
import UIBlock from '../../UIBlock/UIBlock';
import UIButton from '../../UIButton/UIButton';

export default class QuizDoneScreen extends Component {
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
                                <div className="QuizDoneScreen-Title-Text" style={{ marginBottom: 20 }}>Quiz done!</div>

                                <div className="QuizDoneScreen-Line-Text" style={{ marginBottom: 20 }}>Points: {points}</div>

                                <div className="QuizDoneScreen-Line-Text" style={{ marginBottom: 20 }}>Right answers: {rightAnswers}/{totalQuestions}</div>

                                {<div className="QuizDoneScreen-Record-Text" style={{ marginBottom: 20 }}>New high score!</div>}

                                <div style={{position:'absolute', bottom: 5}}>
                                    <UIButton
                                        title={"Play new quiz!"}
                                        width={'20vw'}
                                        height={60}
                                        marginWidth={0}
                                        marginHeight={0}
                                        autoAdjustFontSize
                                        onClick={() => this.props.setScreen('Play')}
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

