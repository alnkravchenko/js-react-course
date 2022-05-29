import { Component } from 'react';
import PropTypes from "prop-types"

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error-message/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        character: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacter();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateCharacter();
        }
    }

    onError = () => {
        this.setState({ loading: false, error: true });
    }

    onCharLoaded = character => {
        this.setState({ character, loading: false });
    }

    updateCharacter = () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.marvelService.getCharacterById(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { character, loading, error } = this.state;
        const skeleton = (character || loading || error) ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(!character || loading || error) ? <View character={character} /> : null;

        return (
            <div className="char__info" >
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({ character }) => {
    const { id, name, description, thumbnail, homepage, wiki, comics } = character;
    const thumbnailStyle = {};
    if (thumbnail.includes("image_not_available")) {
        thumbnailStyle.objectFit = "contain";
    }

    const comicsElements = comics.map((item, index) => {
        if (index > 9) return;
        return (
            <li className="char__comics-item" key={id + index}>
                {item.name}
            </li>
        );
    });

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={thumbnailStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "There are no comics with this character"}
                {comicsElements}
            </ul>
        </>
    );
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;