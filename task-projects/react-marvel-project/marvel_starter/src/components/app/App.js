import AppHeader from "../app-header/AppHeader";
import RandomChar from "../random-char/RandomChar";
import CharList from "../char-list/CharList";
import CharInfo from "../char-info/CharInfo";

import decoration from '../../resources/img/vision.png';

const App = () => {
    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <div className="char__content">
                    <CharList />
                    <CharInfo />
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )
}

export default App;