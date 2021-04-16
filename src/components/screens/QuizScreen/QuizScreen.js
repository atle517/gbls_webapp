import React, { Component } from 'react'
import './QuizScreen.css';
import UIBlock from '../../UIBlock/UIBlock'
import { Spring } from 'react-spring/renderprops';
import UIButton from '../../UIButton/UIButton';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import UIfx from 'uifx'
import tickSound from '../../../sounds/Tick.ogg'
import correctSound from '../../../sounds/Correct.ogg'
import wrongSound from '../../../sounds/Wrong.ogg'

const tickSoundOn = false;
const timeDuration = 30;

const tickSoundEffect = new UIfx(
    tickSound,
    {
        volume: 0.4, // number between 0.0 ~ 1.0
        throttleMs: 100
    }
)

const correctSoundEffect = new UIfx(
    correctSound,
    {
        volume: 0.4, // number between 0.0 ~ 1.0
        throttleMs: 100
    }
)


const wrongSoundEffect = new UIfx(
    wrongSound,
    {
        volume: 0.8, // number between 0.0 ~ 1.0
        throttleMs: 100
    }
)

export default class QuizScreen extends Component {

    constructor(props) {
        super(props)
        const { quiz } = this.props;

        this.state = {
            questionId: 0,
            currentQuestion: quiz.questions[0].questionText,
            currentAnswers: quiz.questions[0].answers,
            answered: false,
            answeredButtonId: null,
            points: 0,
            rightAnswers: 0,

        }

        this.tickTime = timeDuration;
        this.questionScore = quiz.score / quiz.questions.length;

        console.log(quiz)

    }

    setNextQuestion = () => {
        const { quiz } = this.props;

        let nextQuestionId = this.state.questionId + 1;

        this.tickTime = timeDuration;

        this.setState({
            questionId: nextQuestionId,
            currentQuestion: quiz.questions[nextQuestionId].questionText,
            currentAnswers: quiz.questions[nextQuestionId].answers,
            answered: false,
        });

    }

    handleAnswer = (correct, buttonId) => {
        this.setState({
            answered: true,
            answeredButtonId: buttonId,
        })

        if (correct) {
            correctSoundEffect.play();

            this.addPoints(parseInt(this.questionScore * (this.tickTime / timeDuration)));

        } else {
            wrongSoundEffect.play();
        }

        const nextQuestionInterval = setInterval(() => {
            if (this.state.questionId + 1 < this.props.quiz.questions.length) {
                this.setNextQuestion();
            } else {
                this.finishQuiz();
            }

            clearInterval(nextQuestionInterval);
        }, 2000);

    }

    finishQuiz = () => {
        this.props.answeredQuiz(this.state.points, this.state.rightAnswers, this.props.quiz)
    }

    addPoints = points => {
        this.setState(prevState => ({
            points: prevState.points + points,
            rightAnswers: prevState.rightAnswers + 1
        }));
    }

    showButtonColor = (correct, buttonId) => {
        if (correct) {
            return "lime";
        } else {
            if (buttonId === this.state.answeredButtonId) {
                return "red";
            }
        }

        return "";
    }

    timeTick = time => {
        if (time != this.tickTime) {
            if (tickSoundOn) tickSoundEffect.play();

            this.tickTime = time;
        }
    }

    render() {
        const { currentQuestion, currentAnswers, answered } = this.state;
        const { quiz } = this.props;

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
                                <div className={'QuizScreen-QuizName-Text'} style={{ fontSize: 42 }}>{quiz.quizName}</div>

                                {/* Question */}
                                <div style={{ display: 'flex', flex: 2 / 3, flexDirection: 'row', alignItems: 'center' }}>
                                    <div className='QuizScreen-QuizQuestion-Text' style={{ marginTop: 100 }}>{currentQuestion}</div>
                                </div>

                                {/* Points */}
                                <div style={{ position: 'absolute', top: 10, left: 10 }}>
                                    <div className='QuizScreen-QuizName-Text'>Points: {this.state.points}</div>
                                </div>

                                {/* Countdown timer */}
                                <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                    <CountdownCircleTimer
                                        isPlaying={!answered}
                                        key={this.state.questionId}
                                        duration={timeDuration}
                                        strokeWidth={15}
                                        size={150}

                                        trailColor={"#A87000"}

                                        colors={[
                                            ['#68FF7A', 0.33],
                                            ['#FDFF68', 0.5],
                                            ['#FF0000', 0.2],
                                        ]}

                                        onComplete={() => this.handleAnswer(false, -1)}

                                    >
                                        {({ remainingTime }) => {
                                            this.timeTick(remainingTime);
                                            return <div className={'QuizScreen-QuizName-Text'} style={{ fontSize: 48 }}>{remainingTime}</div>
                                        }}

                                    </CountdownCircleTimer>
                                </div>

                                {/* Answers */}
                                {/* <div style={{ display: 'flex', flex: 1 / 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}> */}
                                <div className={"QuizScreen-Grid"}>
                                    {currentAnswers.map((answer, i) =>
                                        <UIButton
                                            key={i}
                                            title={answer.description}
                                            width={'20vw'}
                                            height={60}
                                            marginWidth={0}
                                            marginHeight={0}
                                            autoAdjustFontSize
                                            onClick={answered ? (() => { }) : (() => this.handleAnswer(answer.correct, i))}
                                            color={answered ? this.showButtonColor(answer.correct, i) : ('')}
                                        />


                                    )}
                                </div>

                                {/* Show quiz question progress */}
                                <div className={'QuizScreen-QuizName-Text'}>{this.state.questionId + 1}/{quiz.questions.length}</div>

                            </div>
                        </UIBlock>
                    </div>
                )}


            </Spring>
        )
    }
}
