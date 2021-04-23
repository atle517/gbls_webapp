import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const StyledRating = withStyles({
    iconFilled: {
        color: '#ffe600',
    },
    iconHover: {
        color: '#fffb00',
    },
})(Rating);



export default class RatingUI extends Component {
    render() {
        return (
            <div style={{ scale: 20 }}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {this.props.readOnly &&
                        <StyledRating
                            name="half-rating"
                            size="large"
                            value={this.props.defaultValue}
                            precision={1}
                            readOnly={this.props.readOnly}
                            onChange={(e, value) => this.props.setRating(value)}
                        />
                    }

                    {!this.props.readOnly &&
                        <StyledRating
                            name="half-rating"
                            size="large"
                            defaultValue={this.props.defaultValue}
                            precision={1}
                            readOnly={this.props.readOnly}
                            onChange={(e, value) => this.props.setRating(value)}
                        />
                    }
                </Box>
            </div>
        )
    }
}
