import "./app-filter.css";

const AppFilter = () => {
    return (
        <div className="btn-group">
            <button className="btn btn-light" type="button">All</button>
            <button className="btn btn-outline-light" type="button">Promoting</button>
            <button className="btn btn-outline-light" type="button">Rate more than 1000$</button>
        </div>
    );
}

export default AppFilter;