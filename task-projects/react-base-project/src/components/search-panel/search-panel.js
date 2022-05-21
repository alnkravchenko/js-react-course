import { Component } from "react";
import "./search-panel.css";

class SearchPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: ""
        }
    }

    onUpdateSearch = (e) => {
        const term = e.target.value;
        this.setState({ searchText: term });
        this.props.onUpdateSearch(term);
    }

    render() {
        return (
            <input type="text"
                className="form-control search-input"
                placeholder="Find employee"
                value={this.state.searchText}
                onChange={this.onUpdateSearch} />
        );
    }
};

export default SearchPanel;