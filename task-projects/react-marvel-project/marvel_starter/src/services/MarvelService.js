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

    getAllCharacters = () => {
        const url = this._baseURL + `characters?limit=9&offset=210&apikey=${publicKey}`;
        return this.getResource(url);
    }

    getCharacterById = id => {
        const url = this._baseURL + `characters/${id}?apikey=${publicKey}`;
        return this.getResource(url);
    }
}