import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppHeader from "../app-header/AppHeader";
import { MainPage, ComicsPage } from "../pages";

const App = () => {

    return (
        <BrowserRouter>
            <div className="app" >
                <AppHeader />
                <main>
                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route exact path="/comics" component={ComicsPage} />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;