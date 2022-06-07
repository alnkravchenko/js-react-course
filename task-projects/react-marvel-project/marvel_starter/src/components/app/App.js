import { useState } from "react";

import AppHeader from "../app-header/AppHeader";
import RandomChar from "../random-char/RandomChar";
import CharList from "../char-list/CharList";
import CharInfo from "../char-info/CharInfo";
import ErrorBoundary from "../error-boundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = id => setChar(id);

    return (
        <div className="app" >
            <AppHeader />
            <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )
}

export default App;