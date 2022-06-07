import { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types"

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error-message/ErrorMessage';
import Character from '../char-card/Character';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = props => {

    const [characters, setChar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [characterEnded, setCharEnd] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => onRequest(), [])

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharLoaded)
            .catch(onError);
    }

    const onCharListLoading = () => setNewItemLoading(true);

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharLoaded = newCharacters => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }

        setChar(characters => [...characters, ...newCharacters]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnd(ended);
    }

    const itemRefs = useRef([]);

    const focusOnItem = index => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[index].classList.add('char__item_selected');
        itemRefs.current[index].focus();
    }

    const renderItems = characters => {
        const items = characters.map((char, index) =>
            <Character
                key={char.id}
                ref={el => itemRefs.current[index] = el}
                character={char}
                onSelected={() => {
                    props.onCharSelected(char.id);
                    focusOnItem(index)
                }} />);
        return (
            <ul className="char__grid">
                {items}
            </ul>
        );
    }

    const items = renderItems(characters);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list" >
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ "display": characterEnded ? "none" : "block" }}>
                <div className="inner">load more</div>
            </button>
        </div >
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;