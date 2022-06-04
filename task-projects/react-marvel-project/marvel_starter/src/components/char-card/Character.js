import React, { Component } from "react";
import PropTypes from "prop-types"

import './charCard.scss';

class Character extends Component {
    constructor(props) {
        super(props);
        const { character: { name, thumbnail } } = this.props;
        this.state = {
            name: name,
            thumbnail: thumbnail,
            classes: ["char__item"]
        };
        this.curRef = React.createRef();
    }

    setClass = className => {
        this.setState(state => ({
            ...state,
            classes: [...state.classes, className]
        }))
    }

    removeClass = className => {
        this.setState(state => ({
            ...state,
            classes: state.classes.filter(c => c !== className)
        }))
    }

    focus = () => {
        this.curRef.current.focus();
    }

    render() {
        const { name, thumbnail, classes } = this.state;
        const thumbnailStyle = {};
        if (thumbnail.includes("image_not_available")) {
            thumbnailStyle.objectFit = "contain";
        }

        return (
            <li className={classes.join(" ")}
                ref={this.curRef}
                onClick={this.props.onSelected}
                onKeyDown={e => {
                    if (e.key === " " || e.key === "Enter") this.props.onSelected();
                }} >
                <img src={thumbnail} alt={name} style={thumbnailStyle} />
                <div className="char__name">{name}</div>
            </li >
        );
    }
}

Character.propTypes = {
    character: PropTypes.shape({
        name: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired,
    onSelected: PropTypes.func.isRequired
}

export default Character;