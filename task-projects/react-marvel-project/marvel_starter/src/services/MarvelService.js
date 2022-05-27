import { publicKey } from "../env/config.json";

export default class MarvelService {
    _baseURL = "https://gateway.marvel.com:443/v1/public/"

    getResource = async url => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async () => {
        const url = this._baseURL + `characters?limit=9&offset=210&apikey=${publicKey}`;
        const res = await this.getResource(url);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacterById = async id => {
        const url = this._baseURL + `characters/${id}?apikey=${publicKey}`;
        const res = await this.getResource(url);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = charData => {
        const thumbnail = Object.values(charData.thumbnail).join(".");
        if (charData.description.length == 0) {
            charData.description = "Character description not found"
        } else if (charData.description.length > 210) {
            charData.description = charData.description.slice(0, 210) + "...";
        }
        return {
            name: charData.name,
            description: charData.description,
            thumbnail: thumbnail,
            homepage: charData.urls[0].url,
            wiki: charData.urls[1].url
        };
    }
}