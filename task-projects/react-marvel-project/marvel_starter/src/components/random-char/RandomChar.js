import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error-message/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [character, setChar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        getRandomCharacter();
        const timerId = setInterval(getRandomCharacter, 5000);

        return () => clearInterval(timerId);
    }, [])

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharLoaded = character => {
        setChar(character);
        setLoading(false);
    }

    const getRandomCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        marvelService.getCharacterById(id)
            .then(onCharLoaded)
            .catch(onError);
    }


    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View character={character} /> : null;

    return (
        <div className="randomchar" >
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                    onClick={getRandomCharacter}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );
}

const View = ({ character }) => {
    const { name, description, thumbnail, homepage, wiki } = character;
    const thumbnailStyle = {};
    if (thumbnail.includes("image_not_available")) {
        thumbnailStyle.objectFit = "contain";
    }

    return (<div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className="randomchar__img"
            style={thumbnailStyle} />
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{description}</p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>);
}

export default RandomChar;