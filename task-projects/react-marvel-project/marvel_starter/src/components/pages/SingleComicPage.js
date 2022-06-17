import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useMarvelService } from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error-message/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);

    const { loading, error, getComicById, clearError } = useMarvelService();

    useEffect(() => updateComic(), [comicId]);

    const updateComic = () => {
        clearError();
        getComicById(comicId).then(setComic);
    }


    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(!comic || loading || error) ? <View comic={comic} /> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ comic }) => {
    const { title, description, pageCount, thumbnail, price, language } = comic;

    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    );
}

export default SingleComicPage;