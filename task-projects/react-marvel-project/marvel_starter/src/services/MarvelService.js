import { publicKey } from "../env/config.json";
import { useHttp } from "../hooks/http.hook";

export const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _baseURL = "https://gateway.marvel.com:443/v1/public/"
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const url = _baseURL +
            `characters?limit=9&offset=${offset}&apikey=${publicKey}`;
        const res = await request(url);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacterById = async id => {
        const url = _baseURL + `characters/${id}?apikey=${publicKey}`;
        const res = await request(url);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const url = _baseURL +
            `comics?limit=9&offset=${offset}&apikey=${publicKey}`;
        const res = await request(url);
        return res.data.results.map(_transformComics);
    }


    const _transformCharacter = charData => {
        const thumbnail = Object.values(charData.thumbnail).join(".");
        if (charData.description.length === 0) {
            charData.description = "Character description not found"
        } else if (charData.description.length > 210) {
            charData.description = charData.description.slice(0, 210) + "...";
        }
        return {
            id: charData.id,
            name: charData.name,
            description: charData.description,
            thumbnail: thumbnail,
            homepage: charData.urls[0].url,
            wiki: charData.urls[1].url,
            comics: charData.comics.items
        };
    }

    const _transformComics = comicsData => {
        const thumbnail = Object.values(comicsData.thumbnail).join(".");
        const price = comicsData.prices[0].price ? comicsData.prices[0].price + "$" : "NOT AVAILABLE";
        const pageCount = comicsData.pageCount ? `${comicsData.pageCount} p.` : 'No information about the number of pages'

        return {
            id: comicsData.id,
            title: comicsData.title,
            description: comicsData.description || 'There is no description',
            pageCount: pageCount,
            thumbnail: thumbnail,
            price: price,
            language: comicsData.textObjects.language || 'en-us'
        }
    }

    return {
        loading, error, getAllCharacters, getCharacterById, clearError, getAllComics
    };
}