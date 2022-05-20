import { Component } from "react";

import "./app.css";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: "John C.", salary: 800, increase: true, id: 1 },
                { name: "Alex M.", salary: 3000, increase: false, id: 2 },
                { name: "Carl W.", salary: 5000, increase: true, id: 3 }
            ]
        };
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            const filtered = data.filter(row => row.id !== id);

            return { data: filtered };
        });
    }

    addItem = (name, salary) => {
        this.setState(({ data }) => {
            const newEmployee = {
                name: name,
                salary: salary,
                increase: false,
                id: this.maxId
            }

            return { data: [...data, newEmployee] };
        });
    }

    render() {
        return (
            <div className="app" >
                <AppInfo />
                <div className="search-panel">
                    <SearchPanel />
                    <AppFilter />
                </div>

                <EmployeesList data={this.state.data}
                    onDelete={this.deleteItem} />
                <EmployeesAddForm onAdd={this.addItem} />
            </div >
        );
    }
};

export default App;