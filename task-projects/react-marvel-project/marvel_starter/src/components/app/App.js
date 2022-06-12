import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../app-header/AppHeader";
import RandomChar from "../random-char/RandomChar";
import CharList from "../char-list/CharList";
import CharInfo from "../char-info/CharInfo";
import ErrorBoundary from "../error-boundary/ErrorBoundary";
import AppBanner from "../app-banner/AppBanner"
import ComicsList from "../comics-list/ComicsList"

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = id => setChar(id);

    return (
        <Router>
            <div className="app" >
                <AppHeader />
                <main>
                    <Switch>
                        <Route exact path="/">
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
                        </Route>
                        <Route exact path="/comics">
                            <AppBanner />
                            <ComicsList />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;