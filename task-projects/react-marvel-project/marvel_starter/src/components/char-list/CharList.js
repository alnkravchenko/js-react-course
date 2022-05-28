import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error-message/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onError = () => {
        this.setState({ loading: false, error: true });
    }

    onCharLoaded = characters => {
        this.setState({ characters, loading: false });
    }

    renderItems = characters => {
        const items = characters.map(char =>
            <Character key={char.id} character={char} />);
        return (
            <ul className="char__grid">
                {items}
            </ul>
        );
    }

    render() {
        const { characters, loading, error } = this.state;
        const items = this.renderItems(characters);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list" >
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const Character = ({ character: { name, thumbnail } }) => {
    const thumbnailStyle = {};
    if (thumbnail.includes("image_not_available")) {
        thumbnailStyle.objectFit = "contain";
    }

    return (
        <li className="char__item">
            <img src={thumbnail} alt={name} style={thumbnailStyle} />
            <div className="char__name">{name}</div>
        </li >
    );
}


export default CharList;