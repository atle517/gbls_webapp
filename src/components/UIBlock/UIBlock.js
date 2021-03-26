import React, { Component } from 'react'
import './UIBlock.css';

export default class UIBlock extends Component {
    render() {
        return (
            <div className="UIBlock-Container">
                {this.props.children}
            </div>
        )
    }
}
