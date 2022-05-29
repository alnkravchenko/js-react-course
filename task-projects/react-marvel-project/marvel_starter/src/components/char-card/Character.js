import { Component } from "react";

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

export default Character;