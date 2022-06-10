import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error-message/ErrorMessage';
import { useMarvelService } from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnd] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => onRequest(offset, true), [])

    const onRequest = (offset, initial) => {
        setNewItemLoading(!initial);
        getAllComics(offset).then(onComicsLoaded);
    }

    const onComicsLoaded = newComics => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }

        setComics(comics => [...comics, ...newComics]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnd(ended);
    }

    const renderItems = comics => {
        const items = comics.map((comics, index) =>
            <li key={comics.id} className="comics__item">
                <a href="#">
                    <img src={comics.thumbnail} alt={comics.title} className="comics__item-img" />
                    <div className="comics__item-name">{comics.title}</div>
                    <div className="comics__item-price">{comics.price}</div>
                </a>
            </li>
        );
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }

    const items = renderItems(comics);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ "display": comicsEnded ? "none" : "block" }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;