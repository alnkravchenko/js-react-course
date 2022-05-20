import "./employees-list.css";
import EmployeesListItem from "../employees-list-item/employees-list-item";

const EmployeesList = ({ data }) => {
    const elements = data.map((line) => {
        const { id, ...itemProps } = line;
        return <EmployeesListItem key={id} {...itemProps} />
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployeesList;