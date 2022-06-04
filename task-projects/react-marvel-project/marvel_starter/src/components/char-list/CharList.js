import { Component } from 'react';
import PropTypes from "prop-types"

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error-message/ErrorMessage';
import Character from '../char-card/Character';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        characterEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({ newItemLoading: true });
    }

    onError = () => {
        this.setState({ loading: false, error: true });
    }

    onCharLoaded = newCharacters => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }

        this.setState(({ characters, offset }) => ({
            characters: [...characters, ...newCharacters],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            characterEnded: ended
        }));
    }

    itemRefs = [];

    setRef = ref => {
        this.itemRefs.push(ref);
    }

    focusOnItem = index => {
        this.itemRefs.forEach(item => item.removeClass('char__item_selected'));
        this.itemRefs[index].setClass('char__item_selected');
        this.itemRefs[index].focus();
    }

    renderItems = characters => {
        const items = characters.map((char, index) =>
            <Character
                key={char.id}
                ref={this.setRef}
                character={char}
                onSelected={() => {
                    this.props.onCharSelected(char.id);
                    this.focusOnItem(index)
                }} />);
        return (
            <ul className="char__grid">
                {items}
            </ul>
        );
    }

    render() {
        const { characters, loading, error, offset, newItemLoading, characterEnded } = this.state;
        const items = this.renderItems(characters);

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
                    onClick={() => this.onRequest(offset)}
                    style={{ "display": characterEnded ? "none" : "block" }}>
                    <div className="inner">load more</div>
                </button>
            </div >
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;