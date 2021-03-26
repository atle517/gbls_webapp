import React, { Component } from 'react'
import './UIButton.css';

export default class UIButton extends Component {
    render() {

        const { title, width, height, fontSize, onClick } = this.props;

        return (
            <div className="UIButton-Container" style={{ width: width, height: height, fontSize: fontSize }} onClick={() => onClick()} >
                {title}
            </div>
        )
    }
}
