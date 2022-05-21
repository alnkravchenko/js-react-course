import "./employees-list.css";
import EmployeesListItem from "../employees-list-item/employees-list-item";

const EmployeesList = ({ data, onDelete, onToggleProp }) => {
    const elements = data.map(line => {
        const { id, ...itemProps } = line;
        return <EmployeesListItem
            key={id}
            {...itemProps}
            onDelete={() => onDelete(id)}
            onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute("data-toggle"))} />
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployeesList;