import React, { Component } from 'react'
import './UIButton.css';

export default class UIButton extends Component {

    // Adjust the font size for the button
    adjustFontSize = (text) => {

        let size = 64 - (text.length * 2);

        if (size < 20) size = 20;

        return size
    }

    render() {

        const { title, width, height, fontSize, onClick, autoAdjustFontSize, marginWidth, marginHeight, color } = this.props;

        return (
            <div className="UIButton-Container"
                style={{
                    width: width,
                    height: height,
                    fontSize: autoAdjustFontSize ? this.adjustFontSize(title) : fontSize,
                    whiteSpace: 'pre-line',
                    marginLeft: marginWidth, marginRight: marginWidth,
                    marginTop: marginHeight, marginBottom: marginHeight,
                    whiteSpace: 'pre-line',
                    background: color,
                    backgroundColor: color,

                }} onClick={() => onClick()} >

                {title}
            </div>
        )
    }
}
