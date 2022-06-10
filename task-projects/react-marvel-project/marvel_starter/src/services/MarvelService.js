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

    return {
        loading, error, getAllCharacters, getCharacterById, clearError
    };
}