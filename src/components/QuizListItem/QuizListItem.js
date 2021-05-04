import React, { Component } from 'react'
import './QuizListItem.css';

export default class QuizListItem extends Component {

    render() {

        const { quiz, getUserName, selected } = this.props;

        // Returns a quiz list item
        return (
            <div className={selected ? "QuizListItem-Main-Selected" : "QuizListItem-Main"} onClick={() => this.props.setSelectedQuiz(quiz)}>
                <div style={{display: 'flex', flex: '4'}}>{quiz.quizName}</div>
                <div style={{display: 'flex', flex: '2', justifyContent: 'center'}}>{getUserName(quiz.userID)}</div>
                <div style={{display: 'flex', flex: '2', justifyContent: 'center'}}>{quiz.questions.length}</div>
                <div style={{display: 'flex', flex: '1', justifyContent: 'center'}}>{this.props.highscore}</div>
            </div>
        )
    }
}
