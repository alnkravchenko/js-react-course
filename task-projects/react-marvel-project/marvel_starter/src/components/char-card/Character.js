import React, { useState } from "react";
import PropTypes from "prop-types"

import './charCard.scss';

const Character = (props, ref) => {
    const name = useState(props.character.name)[0];
    const thumbnail = useState(props.character.thumbnail)[0];

    const thumbnailStyle = {};
    if (thumbnail.includes("image_not_available")) {
        thumbnailStyle.objectFit = "contain";
    }

    return (
        <li className="char__item"
            ref={ref}
            onClick={props.onSelected}
            onKeyDown={e => {
                if (e.key === ' ' || e.key === "Enter") props.onSelected();
            }} >
            <img src={thumbnail} alt={name} style={thumbnailStyle} />
            <div className="char__name">{name}</div>
        </li>
    );
}

export default React.forwardRef(Character);