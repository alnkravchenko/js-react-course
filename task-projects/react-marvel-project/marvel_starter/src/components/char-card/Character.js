import { Component } from "react";
import PropTypes from "prop-types"

import './charCard.scss';

class Character extends Component {
    constructor(props) {
        super(props);
        const { character: { name, thumbnail } } = this.props;
        this.state = { name: name, thumbnail: thumbnail };
    }

    onSelect = () => {
        this.props.onSelected(this.props["data-id"]);
    }

    render() {
        const { name, thumbnail } = this.state;
        const thumbnailStyle = {};
        if (thumbnail.includes("image_not_available")) {
            thumbnailStyle.objectFit = "contain";
        }

        return (
            <li className="char__item" onClick={this.onSelect} >
                <img src={thumbnail} alt={name} style={thumbnailStyle} />
                <div className="char__name">{name}</div>
            </li >
        );
    }
}

Character.propTypes = {
    "data-id": PropTypes.number.isRequired,
    character: PropTypes.shape({
        name: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
    }).isRequired,
    onSelected: PropTypes.func.isRequired
}

export default Character;