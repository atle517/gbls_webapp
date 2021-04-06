import React, { Component } from 'react'
import './QuizDoneScreen.css';
import { Spring } from 'react-spring/renderprops';
import UIBlock from '../../UIBlock/UIBlock';

export default class QuizDoneScreen extends Component {
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
                            
                        </UIBlock>
                    </div>
                )}


            </Spring>
        )
    }
}

